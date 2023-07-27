# CASVAL Base Backend API

CASVAL'ın Backend api mimarisi

## İçerik Listesi

1. Kurulum
    - Gereksinimler
    - Kurulum Adımları
    - Örnek Kod
2. API Endpointleri(WIP)
    - Endpoint 1
        - Açıklama
        - Kullanım Örnekleri
        - Parametreler
        - Başarı Durumları
        - Hata Durumları
    - Endpoint 2
        - Açıklama
        - Kullanım Örnekleri
        - Parametreler
        - Başarı Durumları
        - Hata Durumları
3. Güvenlik(WIP)
    - Yetkilendirme
    - Kimlik Doğrulama
4. Sınırlar(WIP)
5. Sık Sorulan Sorular (SSS)(WIP)

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
