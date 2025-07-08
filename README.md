# 📝 Next.js Todo Uygulaması – Medyanes Staj Görevi

Bu proje, Medyanes firmasının staj başvurusu kapsamında verilen teknik görev çerçevesinde geliştirilmiş bir Todo uygulamasıdır. Kullanıcı giriş yapabilir , kendi görevlerini oluşturabilir, düzenleyebilir ve silebilir.

## 🚀 Özellikler

- ✅ Kullanıcıya özel todo listesi
- ➕ Yeni görev ekleme
- ✏️ Görev güncelleme
- ❌ Görev silme (ve silineni geri alma)
- 📦 MongoDB ile veri saklama
- 🧠 Zustand ile global state yönetimi
- ⚙️ Clean component & backend architecture
- 🌐 Responsive tasarım
- 🔐 NextAuth.js ile giriş sistemi (varsa)

## 🛠️ Kullanılan Teknolojiler

- [Next.js 15](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/) 
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [MongoDB](https://www.mongodb.com/)
- [Prisma ORM](https://www.prisma.io/)
- [React Hook Form](https://react-hook-form.com/) 
- [zod](https://zod.dev/)
- [toastify](https://fkhadra.github.io/react-toastify)


## 🧱 Proje Mimarisi

Bu proje, Next.js 15 App Router yapısı kullanılarak component bazlı ve global state managment sistemiyle geliştirilmiştir. Authentication sistemi olarak nextauth kullanılmıştır.
Aşağıda mimari detaylar yer almaktadır:

---

#### 📦 1. Global State Management (Zustand)

Global state yönetimi için [Zustand](https://github.com/pmndrs/zustand) kullanılmaktadır. Uygulamanın genelinde `store/` klasöründe tanımlı olan store üzerinden state yönetimi yapılır.

- Todo verileri
- Modal görünürlüğü
- Giriş yapan kullanıcı bilgileri (varsa)

Bunları kullanarak uygulamanın her yerinde global fonksiyonlara ulaşılır. Tekrar kullanılabilir , okunabilir bir yapı sağlar.
Ayrıca backend fonksiyonlarından sonra **optimistic update** kullanılarak daha iyi  bir deneyim sağlanır. 

---

#### 🧩 2. Component Yapısı

Tüm görsel bileşenler `components/` klasöründe saklanmaktadır. Component'ler tek sorumluluk prensibine uygun olacak şekilde bölünmüştür.

Örnek component yapısı:

```
components/
...
 ┣ /global
 ┣ /todo
   ┣ TodoItem.tsx
   ┣ TodoForm.tsx
 ┣ Modal.tsx
 ┗ Header.tsx
...
```

Her component, prop bazlı yönetilir ve yeniden kullanılabilirlik gözetilerek yazılmıştır.

---

#### 🪟 3. Modal Yapısı

Uygulamada `Modal` component'i, Zustand ile kontrol edilen global bir state üzerinden yönetilmektedir.

- `openModal()` ve `closeModal()` fonksiyonları Zustand store üzerinden erişilir.
- Modal içeriği dinamik olarak belirlenebilir (örneğin: düzenleme , ekleme formu).

Bu yapı sayesinde modallar her yerden kolayca tetiklenebilir ve uygulamanın karmaşıklığı azaltılmış olur.

---

#### ⚙️ 4. Backend Fonksiyonları (Actions & Route Handlers)

Next.js 15 ile gelen `server actions` yapısı kullanılarak backend işlemleri `app/actions/` altında tanımlanmıştır.

- Prisma ile doğrudan veritabanı işlemlerini gerçekleştirir.
- Global state tarafında veya gerekirse UI bileşenleri tarafından doğrudan çağrılabilir.

Ayrıca, geleneksel **REST API** mantığında çalışan `route handlers` kullanılarak `app/api/` altında oturum yönetimi ve veri işlemleri gerçekleştirilmiştir.

- `GET` , `POST` , `PUT` , `DELETE` metodlarıyla kullanıcıya özel veriler yönetilir.
- `getServerSession` ile auth kontrolü yapılır.

---

#### 🧬 5. ORM Katmanı (Prisma)

Veritabanı işlemleri için [Prisma](https://www.prisma.io/) ORM kullanılmıştır.

- `prisma/schema.prisma` dosyasında `Todo` ve `User` modelleri tanımlıdır.
- `lib/prisma.ts` dosyası üzerinden Prisma Client erişimi yapılır.

---

#### 🔐 6. Kimlik Doğrulama ve Erişim Kontrolü

Uygulamada kimlik doğrulama işlemleri için **NextAuth.js** kullanılmıştır.  
Bu amaçla, **auth** ve **public** olmak üzere iki ayrı layout tanımlanmıştır. Kullanıcı oturumu (session) bilgisine göre sayfalara erişim kontrolü sağlanmaktadır:

- Kullanıcı giriş yapmışsa **auth layout**’a yönlendirilir ve yetkili sayfalara erişim sağlanır.  
- Giriş yapılmamışsa **public layout**’taki sayfalar gösterilir.

Ayrıca backend tarafında, tüm server action ve route handler fonksiyonlarında `getServerSession` kullanılarak kullanıcı oturumu kontrol edilmiştir.  
`session.user.id` gibi değerler üzerinden yetkilendirme işlemleri yapılmakta, böylece hem frontend hem backend katmanlarında güvenli ve oturum bazlı bir yapı sağlanmaktadır.

---

## 🚀 Deployment

Projem, **Vercel** platformu kullanılarak canlıya alınmıştır.  
Güncel ve sorunsuz çalışan uygulamaya aşağıdaki bağlantıdan erişebilirsiniz:

[https://nextjs-todo-medyanes.vercel.app/](https://nextjs-todo-medyanes.vercel.app/)

---

## 🛠️ Kurulum ve Çalıştırma

Bu projeyi yerel geliştirme ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

---

#### 1. Reponun Klonlanması

İlk olarak projeyi GitHub üzerinden klonlayın:

```bash
git clone https://github.com/fevziatanoglu/nextjs-todo-medyanes-task.git
cd nextjs-todo-medyanes-task
```

---

#### 2. Bağımlılıkların Yüklenmesi

Gerekli Node.js paketlerini yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install
```

> Alternatif olarak `yarn` veya `pnpm` kullanıyorsanız `yarn install` veya `pnpm install` komutlarını kullanabilirsiniz.

---

#### 3. Ortam Değişkenlerinin Tanımlanması

Proje kök dizininde `.env` adında bir dosya oluşturun ve aşağıdaki ortam değişkenlerini girin:

```env
DATABASE_URL=your-mongodb-connection-url
NEXTAUTH_SECRET=your-secret-key
```

- `DATABASE_URL`: MongoDB bağlantı adresiniz (örn. MongoDB Atlas)
- `NEXTAUTH_SECRET`: NextAuth için rastgele oluşturulmuş bir gizli anahtar (örn. bir JWT secret)

> `.env` dosyasının versiyon kontrolüne dahil edilmediğinden emin olun.

---

#### 4. Prisma Ayarlarının Yapılması

Veritabanı ile bağlantıyı kurmak ve Prisma istemcisini oluşturmak için:

```bash
npx prisma generate
npx prisma db push
```

Bu komutlar, `prisma/schema.prisma` dosyasındaki modelleri MongoDB'ye gönderir ve gerekli koleksiyonları oluşturur.

---

#### 5. Geliştirme Ortamında Projeyi Başlatma

Projeyi yerel geliştirme modunda başlatmak için:

```bash
npm run dev
```

Ardından aşağıdaki adrese giderek uygulamayı tarayıcınızda görüntüleyebilirsiniz:

[http://localhost:3000](http://localhost:3000)

---

<img width="1672" alt="Ekran Resmi 2025-07-08 13 30 05" src="https://github.com/user-attachments/assets/551ff04b-e766-4647-8419-4cc506a5d80f" />
<img width="1687" alt="Ekran Resmi 2025-07-08 13 31 23" src="https://github.com/user-attachments/assets/f62ab2fb-1d0a-46b4-b135-a194a35b74d9" />
<img width="398" alt="Ekran Resmi 2025-07-08 13 31 42" src="https://github.com/user-attachments/assets/0da1208b-253c-42ec-8c4a-9f04517dcc38" />
<img width="1674" alt="Ekran Resmi 2025-07-08 13 31 56" src="https://github.com/user-attachments/assets/1b19f994-b7d2-4150-88a6-5af413d882bb" />






