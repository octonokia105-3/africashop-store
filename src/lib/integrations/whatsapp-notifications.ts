// Server-side WhatsApp Notification integration for new orders.
// Uses CallMeBot API (Free) to send instant WhatsApp messages.

export async function sendWhatsAppAlert(orderData: {
  order_id: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  package: string;
  total: number;
}) {
  try {
    // In production, these should come from your database or process.env
    // We will hardcode or fetch from env for now. The user needs to set WHATSAPP_PHONE and WHATSAPP_APIKEY
    const phone = process.env.WHATSAPP_PHONE; // The store owner's phone number
    const apikey = process.env.WHATSAPP_APIKEY; // The CallMeBot API key

    if (!phone || !apikey) {
      console.log("⚠️ WhatsApp alerts skipped: Missing WHATSAPP_PHONE or WHATSAPP_APIKEY in environment variables.");
      return false;
    }

    // Format the message
    const message = `
📦 *NEW ORDER RECEIVED!* 📦
*ID:* ${orderData.order_id}
*Name:* ${orderData.customer_name}
*Phone:* ${orderData.phone}
*City:* ${orderData.city}
*Address:* ${orderData.address}
*Package:* ${orderData.package}
*Total:* ${orderData.total} MAD
    `.trim();

    // Encode the text for URL
    const encodedMessage = encodeURIComponent(message);
    
    // CallMeBot API URL
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMessage}&apikey=${apikey}`;

    // Send the request
    const response = await fetch(url, { method: 'GET' });

    if (response.ok) {
      console.log(`✅ [AUTOMATED WHATSAPP ALERT] Sent order ${orderData.order_id} to WhatsApp (${phone})`);
      return true;
    } else {
      const errorText = await response.text();
      console.error(`❌ [AUTOMATED WHATSAPP ALERT] Failed: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error("Failed to send WhatsApp alert:", error);
    return false;
  }
}
