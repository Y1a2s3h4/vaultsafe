import { Tab } from "../types";

const enc = new TextEncoder();
const dec = new TextDecoder();

// Generate a random salt once
const salt = crypto.getRandomValues(new Uint8Array(16));

// Function to derive an AES key from a password and salt
async function deriveAesKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const passwordBuffer = enc.encode(password);
  const baseKey = await crypto.subtle.importKey("raw", passwordBuffer, "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 1000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-CBC", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function genEncryptedText(text: Tab[], password: string): Promise<string> {
  const data = enc.encode(JSON.stringify(text));

  // Generate a random IV for each encryption
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const aesKey = await deriveAesKey(password, salt);

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv,
    },
    aesKey,
    data
  );

  // Combine the IV, salt, and encrypted data
  const combinedData = new Uint8Array(iv.byteLength + salt.byteLength + encryptedData.byteLength);
  combinedData.set(new Uint8Array(iv), 0);
  combinedData.set(new Uint8Array(salt), iv.byteLength);
  combinedData.set(new Uint8Array(encryptedData), iv.byteLength + salt.byteLength);

  return arrayBufferToBase64(combinedData);
}

export async function genDecryptedText(base64Data: string, password: string): Promise<Tab[] | null> {
  try {
    const combinedData = base64ToArrayBuffer(base64Data);
    const iv = new Uint8Array(combinedData.slice(0, 16));
    const salt = new Uint8Array(combinedData.slice(16, 32));
    const encryptedData = new Uint8Array(combinedData.slice(32));

    const aesKey = await deriveAesKey(password, salt);

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv,
      },
      aesKey,
      encryptedData
    );

    return JSON.parse(dec.decode(decryptedData));
  } catch (err) {
    console.log("Error in decrypting:", err);
    return null;
  }
}

// Function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), "");
  return window.btoa(binary);
}

// Function to convert base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
