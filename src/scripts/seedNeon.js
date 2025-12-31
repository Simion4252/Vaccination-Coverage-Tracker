// src/scripts/diagnose.js
require("dotenv").config();

console.log("🔍 Diagnostic check...");
console.log("==========================");

// Check if DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.log("❌ DATABASE_URL is not set in .env");
} else {
  console.log("✅ DATABASE_URL is set");
  
  // Mask password for security
  const masked = process.env.DATABASE_URL.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
  console.log("🔗 Database URL:", masked);
  
  // Check if it looks like a Neon URL
  if (process.env.DATABASE_URL.includes("neon.tech")) {
    console.log("✅ Looks like a Neon URL");
  } else if (process.env.DATABASE_URL.includes("render")) {
    console.log("⚠️  Looks like a Render URL");
  } else if (process.env.DATABASE_URL.includes("localhost")) {
    console.log("⚠️  Looks like a localhost URL");
  } else {
    console.log("❓ Unknown database host");
  }
}

console.log("==========================");
console.log("JWT_SECRET set:", !!process.env.JWT_SECRET);
console.log("PORT:", process.env.PORT || "not set");