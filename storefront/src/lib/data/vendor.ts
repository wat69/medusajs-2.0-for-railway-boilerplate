export const createVendorProduct = async (formData: FormData) => {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/admin/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MEDUSA_ADMIN_TOKEN}`,
        // ⚠️ Viktigt: INTE sätt 'Content-Type' – då förstörs FormData i fetch
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Fel från Medusa:", error);
      return { success: false, error };
    }

    const json = await res.json();
    console.log("Produkt skapad:", json);
    return { success: true, data: json };
  } catch (err) {
    console.error("Exception vid uppladdning:", err);
    return { success: false, error: "Nätverksfel eller serverfel" };
  }
};
