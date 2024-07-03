import CryptoJS from "crypto-js";

// Fungsi untuk melakukan URL-safe base64 encoding
const urlSafeBase64Encode = (str) => {
     return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// Fungsi untuk melakukan URL-safe base64 decoding
const urlSafeBase64Decode = (str) => {
     str = str.replace(/-/g, '+').replace(/_/g, '/');
     while (str.length % 4) {
          str += '=';
     }
     return str;
};

// Fungsi untuk enkripsi ID
export const encryptId = (id) => { 
     const ciphertext = CryptoJS.AES.encrypt(id.toString(), 'secret_key').toString();
     return urlSafeBase64Encode(ciphertext);
};

// Fungsi untuk dekripsi ID
export const decryptId = (encryptedId) => {
     const base64Str = urlSafeBase64Decode(encryptedId);
     const bytes = CryptoJS.AES.decrypt(base64Str, 'secret_key');
     return bytes.toString(CryptoJS.enc.Utf8);
};