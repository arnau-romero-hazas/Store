#!/bin/bash

echo "🔐 Probando login en Bollipan Shop..."

API_URL="http://localhost:4000/api/auth/login"

# Usuario de prueba
USERNAME="bollopan"

# Realizamos la petición POST con curl
RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"$USERNAME\"}")

echo "✅ Respuesta del servidor:"
echo "$RESPONSE"
