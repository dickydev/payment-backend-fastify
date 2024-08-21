# Gunakan Node.js versi yang sesuai
FROM node:18

# Set direktori kerja
WORKDIR /usr/src/app

# Salin file konfigurasi dan dependensi
COPY package*.json ./
RUN npm install

# Salin file proyek ke dalam container
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Jalankan TypeScript Compiler
RUN npm run build

# Expose port yang akan digunakan oleh aplikasi
EXPOSE 3001

# Perintah untuk menjalankan aplikasi
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]