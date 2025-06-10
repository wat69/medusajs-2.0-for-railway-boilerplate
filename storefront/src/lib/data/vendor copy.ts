"use server"
import axios from "axios";
import { getAuthHeaders, setAuthToken } from "./cookies";
import { revalidateTag } from "next/cache";

const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "x-publishable-api-key": PUBLISHABLE_API_KEY!,
  },
});

export async function createVendor(vendorPayload: any, password: any) {

  try {
    // Register vendor

    const headers = {
      ...apiClient.defaults.headers.common, // Retain default headers
      ...getAuthHeaders(), // Add the Authorization header if available
    };

    const { data: vendorData } = await apiClient.post("/vendors", vendorPayload, { headers });
    console.log("vendor created data", vendorData)

    // Now that registration is successful, automatically log in the vendor
    const loginPayload = {
      email: vendorPayload.admin.email, // Assuming adminPayload contains the email
      password: password, // Assuming adminPayload contains the password
    };

    // Call loginVendor after registration
    const loginResult = await loginVendor(loginPayload);

    // Check if login was successful
    if (!loginResult.success) {
      throw new Error(`Login failed: ${loginResult.error}`);
    }

    revalidateTag("vendor");
    return { success: true };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}

export async function registerVendorAdmin(adminPayload: any) {
  try {
    // Register vendor admin
    const { data: tokenData } = await apiClient.post("/auth/vendor/emailpass/register", adminPayload);

    if (!tokenData) throw new Error("Failed to retrieve token.");

    setAuthToken(tokenData.token)


    revalidateTag("vendor");
    return { success: true };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}

export async function loginVendor(loginPayload: any) {

  try {

    const headers = {
      ...apiClient.defaults.headers.common, // Retain default headers
      ...getAuthHeaders(), // Add the Authorization header if available
    };

    const { data: tokenData } = await apiClient.post(`/auth/vendor/emailpass`, loginPayload, { headers })

    console.log("vendor admin login", tokenData)

    const token = tokenData?.token;
    if (!token) throw new Error("Failed to retrieve token.");

    setAuthToken(token);

    revalidateTag("vendor");
    return { success: true };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}

export async function getVendorProducts() {
  try {
    const { data } = await apiClient.get("/vendors/products", {
      headers: getAuthHeaders(),
    });

    return data.products;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createVendorProduct(formData: FormData) {
  try {
    const headers = {
      ...apiClient.defaults.headers.common, // Default headers
      ...getAuthHeaders(), // Authorization
      "Content-Type": "multipart/form-data", // Ensure correct content type
    };

    const { data: product } = await apiClient.post(`/seller/products/create`, formData, { headers });

    console.log("created product", product);

    revalidateTag("products");
    return { success: true };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    return { error: errorMessage, success: false };
  }
}




export async function getVendorOrders() {
  try {
    const { data } = await apiClient.get("/vendors/orders", {
      headers: getAuthHeaders(),
    });

    return data.orders;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getDigitalProductList = async function () {
  try {
    const { data } = await apiClient.get("/store/customers/me/digital-products", {
      headers: getAuthHeaders(),
    });

    return data.digital_products;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function submitPaymentInfo(formData: FormData, customer: any) {
  try {
    const data = Object.fromEntries(formData.entries());

    const requestPayload = {
      creator_id: customer.id,
      amount: customer?.metadata?.total_earnings || 0,
      requested_at: new Date().toISOString(),
      account_holder_name: data.accountHolder,
      bank_name: data.bankName,
      account_number: data.accountNumber,
      swift_code: data.swiftCode,
      status: "pending",
      processed_at: null,
      payment_method: null,
      bank_account: null,
      stripe_account_id: null,
      transaction_id: null,
      metadata: null,
    };

    const headers = {
      ...apiClient.defaults.headers.common,
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    };

    const { data: response } = await apiClient.post("/payout", requestPayload, { headers });

    return { success: true };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    return { error: errorMessage, success: false };
  }
}

// Function to fetch the linked creator for a product
export async function fetchLinkedCreator(productId: string) {
  try {
    const { data } = await apiClient.get(`/store/products/${productId}/creator`);

    // The response should contain the creator information
    return { success: true, creator: data.customer };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    return { success: false, error: errorMessage };
  }
}


export async function getLinkedCreatorOrders(creatorId: string | undefined) {
  try {
    const { data } = await apiClient.get(`/store/ordersList/${creatorId}`, {
      headers: getAuthHeaders(),
    });

    console.log("orders info:", JSON.stringify(data));

    return { success: true, orders: data.orders };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Unknown error";

    return { success: false, error: errorMessage };
  }
}

export async function uploadCustomerAvatar(formData: FormData) {
  try {
    const headers = {
      ...apiClient.defaults.headers.common,
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    };

    const { data: response } = await apiClient.post(`/store/customer/upload-avatar`, formData, { headers });

    console.log("Avatar upload response:", response);

    revalidateTag("customer")


    return { success: true, avatar_url: response.avatar_url };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Unknown error";
    return { success: false, error: errorMessage };
  }
}
export async function uploadTemplate(
  templateData: any,
  customerId: string,
  uploadDetails: {
    title: string;
    description?: string;
    isPremium: boolean;
    price?: number;
  }
) {
  try {
    const jsonBlob = new Blob([JSON.stringify(templateData)], {
      type: "application/json",
    });

    // Validate required parameters
    if (!customerId) {
      throw new Error("Customer ID is required.");
    }

    if (!uploadDetails.title || uploadDetails.title.trim() === "") {
      throw new Error("Theme title is required.");
    }

    if (uploadDetails.isPremium && (uploadDetails.price === undefined || uploadDetails.price <= 0)) {
      throw new Error("Valid price is required for premium themes.");
    }

    // Sanitize and prepare headers
    const headers = {
      ...apiClient.defaults.headers.common,
      ...getAuthHeaders(),
    };

    const generateUniqueSuffix = () => Math.random().toString(36).substring(2, 7);

    const handle = `${uploadDetails.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}-${generateUniqueSuffix()}`;
    

    // Prepare FormData to include the JSON blob as a file
    const formData = new FormData();
    formData.append("files", jsonBlob, `${handle}.json`); // Add the JSON blob as a file

    // Prepare the payload with enhanced details
    const payload = {
      // Theme metadata
      name: uploadDetails.title,
      description: uploadDetails.description || "",
      handle: handle,

      // Creator and monetization details
      creator_id: customerId,
      is_premium: uploadDetails.isPremium, // Boolean value for is_premium
      price: uploadDetails.isPremium ? uploadDetails.price : null, // Numeric price or null

      // Product configuration
      product: {
        title: uploadDetails.title,
        description: uploadDetails.description || "",
        handle: handle,
        options: [{ title: "Color", values: ["Blue"] }],
        variants: [
          {
            title: uploadDetails.title,
            handle: handle,
            options: { Color: "Blue" },
            prices: uploadDetails.isPremium && uploadDetails.price
              ? [{ amount: uploadDetails.price, currency_code: "usd" }]
              : [],
          },
        ],
      },

      // Ensure medias is an empty array if no media
      medias: [], // Adjust this depending on actual media (empty array if none)
    };

    // Append the rest of the payload to FormData
    for (const [key, value] of Object.entries(payload)) {
      formData.append(key, JSON.stringify(value));
    }

    // Perform API call with FormData
    const { data } = await apiClient.post("/store/digital-products", formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      data,
      message: "Theme uploaded successfully!",
    };
  } catch (error: any) {
    // Enhanced error handling
    console.error("Theme upload error:", error);

    return {
      success: false,
      error: error.response?.data?.message || error.message || "An unexpected error occurred",
      errorCode: error.response?.status,
    };
  }
}

export async function fetchs3json(templateUrl: string) {
  try {
    const { data } = await axios.get(templateUrl); // No headers needed

    return {
      success: true,
      data,
      message: "S3 JSON fetched successfully!",
    };
  } catch (error: any) {
    console.error("S3 fetch error:", error);

    return {
      success: false,
      error: error.response?.data?.message || error.message || "An unexpected error occurred",
      errorCode: error.response?.status,
    };
  }
}




export async function upgradeToPremium({
  priceId,
  successUrl,
  cancelUrl,
  creator_id,
  email
}: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  creator_id: string;
  email: string
}) {
  const headers = {
    ...apiClient.defaults.headers.common,
    ...getAuthHeaders(),
  };

  const payload = {
    priceId,
    successUrl,
    cancelUrl,
    creator_id,
    email
  };

  const response = await apiClient.post('/subscription/create-checkout-session', payload, { headers });
  console.log("subscription api response:", response.data)

  return response.data; // caller will handle errors & response
}

export async function verifySubscription(session_id: any) {
  const headers = {
    ...apiClient.defaults.headers.common,
    ...getAuthHeaders(),
  };

  const response = await apiClient.get(`/subscription/success?session_id=${session_id}`, { headers });
  console.log("verify subscription api response:", response.data)
  return response.data
}