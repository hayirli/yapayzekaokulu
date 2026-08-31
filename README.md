# yapayzekaokulu.org

Erasmus+ KA154-YOU projesi · Topkapı Üniversitesi · "Yapay Zeka Okulu"
Yapay zeka + girişimcilik + proje yazma · 10 hafta · 18–29 yaş

## Dosyalar
| Dosya | Ne işe yarar |
|---|---|
| index.html | Ana sayfa (müfredat, proje hakkında, ekip, SSS) |
| egitimler.html | Ders videoları (YouTube gömme) |
| kvkk.html | KVKK aydınlatma metni — hukuk biriminle kontrol et |
| stil.css / site.js / favicon.svg | Tasarım ve animasyon |
| logos/ | 4 kurum logosu — bkz. logos/OKU-BENI.txt |
| gorseller/ | Fotoğraflar — bkz. gorseller/OKU-BENI.txt |
| afis.html | A4 afiş (siteye dahil değil, yazdırmak için) |
| form-olustur.gs | Google Formu otomatik kuran betik |

---

## 1. Başvuru formunu kur (5 dk) — ÖNCE BUNU YAP
`form-olustur.gs` dosyasını aç, içindeki talimatı izle. Özeti:

1. script.google.com → Yeni proje
2. Dosyanın tamamını yapıştır
3. En üstteki `bildirimEposta` satırına kendi adresini yaz
4. Fonksiyon: `kurulumuYap` → Çalıştır → izin ver
5. E-postana form linki gelir

Ne kurulur: form + Google Sheets arşivi + her başvuruda e-posta bildirimi.
Hepsi senin Google hesabında.

---

## 2. Logoları ve fotoğrafı ekle
Erasmus+ 2021-2027 kuralı: soldan sağa **AB Başkanlığı → Türkiye Ulusal Ajansı → AB amblemi**
sırası zorunlu. Site ve afiş bu sıraya göre kurulu.

Üçü de tek adreste: https://ua.gov.tr/kurumsal/logolar/
Topkapı logosunu üniversiteden al.

Ayrıntı ve kurallar: `logos/OKU-BENI.txt`
Fotoğraflar: `gorseller/OKU-BENI.txt`

Yapay zekaya çizdirme; resmi dosya olmak zorunda.

---

## 3. Köşeli parantezleri doldur
Not defterinde "Tümünü değiştir" ile hızlıca yapabilirsin.

| Ara | Yaz |
|---|---|
| `[GOOGLE_FORM_LINKI]` | Adım 1'de gelen kısa form linki |
| `[INSTAGRAM_LINKI]` `[YOUTUBE_LINKI]` `[LINKEDIN_LINKI]` | Sosyal medya adresleri |
| `[2026-1-TR01-KA154-YOU-XXXXXX]` | Proje numarası |
| `[Projenin resmi adı]` `[English title]` | Başvurudaki proje adı |
| `[Ortak kuruluş adları]` `[XX ay]` | Künye bilgileri |
| `İsim eklenecek` | Ekip üyelerinin adları (index.html, Ekip bölümü) |
| `[gün ay]` `[tarih]` `[XX]` `[X]` `[telefon]` `[kampüs adı]` `[%80]` | Program detayları |

---

## 4. Coolify'a yayınla — 3 adım
1. GitHub'da yeni repo aç, buradaki dosyaların tümünü yükle (sürükle-bırak yeter).
2. Coolify → + New Resource → **Public Repository** → repo linki
   → Build Pack: **Dockerfile** → Port: **80** → Deploy.
3. Uygulama → **Domains** → `https://yapayzekaokulu.org`
   DNS'te: A kaydı → sunucu IP'si · www için CNAME → yapayzekaokulu.org
   SSL'i Coolify otomatik alır.

---

## 5. Afişi bastır
`afis.html` → tarayıcıda aç → Ctrl+P → Hedef: "PDF olarak kaydet"
→ Kağıt: A4 → Kenar boşlukları: Yok → "Arka plan grafikleri" AÇIK.

QR kodu: form linkinden üret (Canva'nın QR aracı veya qr-code-generator.com),
afişteki kesikli kutuya yapıştır.

---

## Güncelleme
GitHub'da dosyayı düzenle → kaydet → Coolify otomatik yeniden yayınlar.

---

## E-posta ve spam

Sitede adres açık yazmıyor. `class="eposta"` olan bağlantılar sayfa açılınca
JavaScript ile birleşiyor, kaynak kodda adres geçmiyor. Botların çoğu
JavaScript çalıştırmadığı için adresi toplayamaz.

Adresi değiştirmek istersen HTML'de sadece şu iki değeri düzenle:
`data-k="bilgi"` (kullanıcı adı) ve `data-a="yapayzekaokulu.org"` (alan adı).
site.js'e dokunma.

Afişte adres düz metin duruyor; kağıttan bot toplayamaz, sorun değil.

### Yönlendirme kurulumu
1. Domaini Cloudflare'e taşı (ücretsiz)
2. Email → Email Routing → Create address
3. `bilgi@yapayzekaokulu.org` → `hayriocal@stu.topkapi.edu.tr`
4. Gmail'den bu adresle yazmak istersen:
   Gmail → Ayarlar → Hesaplar → "Başka bir e-posta adresi ekle"

Kişisel adresin hiçbir yerde görünmez. Spam gelirse yönlendirmeyi kapatır,
yeni bir rol adresi açarsın; afiş ve site aynı kalır.
