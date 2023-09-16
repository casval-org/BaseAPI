# CASVAL Base Backend API

CASVAL'ın Backend api mimarisi

## İçerik Listesi

1. Kurulum
    - Gereksinimler
    - Kurulum Adımları
2. API Endpointleri(WIP)
    - Auth Endpoints
    - Payment Endpoints

### Kurulum

Bu API uygulaması Nodejs ile yazılmış olup npm(node package manager) açık kaynak kütüphane ve frameworklerini kullanmaktadır.

#### Gereksinimler

- Bilgisayarınızda Nodejs ve npm'in kurulu olması.
- Aktif bir internet bağlantınızın olması

#### Kurulum Adımları

1. Nodejs ve npm Kurulumu

[Nodejs](https://nodejs.org/en) bağlantısını tarayıcımızda açıyoruz ve en güncel LTS(long term support) olan sürümü bilgisayarımıza kuruyoruz.

Kurulum dosyasını çalıştırıp gerekli adımları uyguladıktan sonra kurulum tamamlanmış olacaktır. Yeni bir terminal açıp `node --version` ve `npm --version` komutlarını kullanarak bilgisayarımıza kurulu olduklarını doğrulayalım.
   
2. Repoyu klonlama

Projeyi çalıştıracağınız klasörde bir terminal açıp `git clone` komutu ile projeyi klonlayın.

```shell
git clone SSH_URL
```

`cd` komutu ile projenin ana klasörüne giriş yapın

```shell
cd BaseAPI
```

3. Bağımlılıkların kurulumu

Projenin ana klasörüne giriş yaptık. Şimdi sırada npm bağımlılıklarını yüklemek var. Terminalinizde aşağıdaki komutu kullanın.

```shell
npm install
```

4. MongoDb Veritabanının Oluşturulması

Projeyi çalıştırabilmek için uygulamanız gereken en önemli adımlardan biri bu adımdır.
- Öncelikle bir [MongoDB](ttps://cloud.mongodb.com/) hesabı oluşturun.
- Ardından ücretsiz bir M0 Cluster oluşturun.
- Oluşturma işleminden sonra username ve password MongoDB tarafından önerilecektir. Bu bilgileri mutlaka not alın. Kaybetmeniz durumunda veritabanına erişmek için Data Access bölümünde şifre sıfırlamanız gerekmektedir.
- Finish and Close dedikten sonra Overview sayfasına yönlendirileceksiniz. Connect'e bastıktan sonra ilk sırada bulunan Compass methodunu seçin. Dilerseniz cihazınıza Compass'i kurabilirsiniz.
- Hemen aşağıda `mongodb+srv://<username>:<password>@cluster0.eb9cq89.mongodb.net/` yazısını kopyalayın ve daha önce kaydettiğiniz username ve password'ü yerleştirerek sıradaki adıma geçin.


5. Ortam Değişkenleri Dosyasını Güncellemek

Klonladığınız projede yer alan `.env.example `içerisindeki değişkenleri `.env` dosyası oluşturarak içine kopyalayın.

```shell
PORT = <Your_Port>

# Database
DB_URL = "mongodb+srv://<username>:<password>@cluster0.ipemtmt.mongodb.net/<database>"

# JWT
JWT_SECRET_KEY = "<Your_JWT_Secret_Key>"
JWT_EXPIRES_IN = "7d"

# Email
EMAIL_ADDRESS = "<Your_Email_Address>"
EMAIL_PASSWORD = "<Your_Email_Password>"

# Temporary JWT
JWT_TEMPORARY_KEY = "<Your_JWT_Temporary_Key>"
JWT_TEMPORARY_EXPIRES_IN = "3m"

# Iyzipay Api Key
PAYMENT_API_KEY = "."
PAYMENT_SECRET_KEY = "."
```

### API Endpointleri

Soon!

