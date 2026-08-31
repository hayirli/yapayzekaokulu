/**
 * YAPAY ZEKA OKULU — BAŞVURU FORMU OTOMATİK OLUŞTURUCU
 * ====================================================
 *
 * NE YAPAR?
 *  1. Google hesabında başvuru formunu tüm sorularıyla oluşturur
 *  2. Yanıtların otomatik biriktiği bir Google Sheets arşivi açar ve forma bağlar
 *  3. Her yeni başvuruda sana e-posta bildirimi gönderir
 *  4. Formun linkini ve arşiv linkini sana e-posta ile yollar
 *
 * NASIL KULLANILIR? (5 dakika)
 *  1. script.google.com adresine kendi Google hesabınla gir
 *  2. "Yeni proje" tıkla
 *  3. Ekrandaki örnek kodu sil, bu dosyanın tamamını yapıştır
 *  4. Aşağıdaki AYARLAR bölümünde e-posta adresini yaz
 *  5. Üstteki menüden çalıştırılacak fonksiyon olarak "kurulumuYap" seç
 *  6. "Çalıştır" tuşuna bas
 *  7. İlk seferde Google izin ister: "İzinleri incele" → hesabını seç →
 *     "Gelişmiş" → "... projesine git (güvenli değil)" → "İzin ver"
 *     (Bu uyarı normaldir; kodu kendi hesabında sen çalıştırıyorsun)
 *  8. Birkaç saniye sonra e-postana form linki gelir. Bitti.
 *
 * SONRA NE YAPACAKSIN?
 *  - Gelen form linkini sitedeki [GOOGLE_FORM_LINKI] yazan yerlere yapıştır
 *  - Aynı linkten QR kod üret, afişe koy
 */

// ============ AYARLAR — SADECE BURAYI DEĞİŞTİR ============

var AYARLAR = {
  // Bildirimlerin geleceği e-posta adresi
  bildirimEposta: 'senin@eposta.com',

  // Formun adı
  formAdi: 'Yapay Zeka Okulu — Başvuru Formu',

  // Son başvuru tarihi (sadece metinde görünür)
  sonTarih: '30 Ekim 2026',

  // Doğum yılı aralığı (18–30 yaş için)
  enKucukDogumYili: 1996,
  enBuyukDogumYili: 2008
};

// ============ BURADAN AŞAĞISINA DOKUNMA ============

function kurulumuYap() {
  var form = FormApp.create(AYARLAR.formAdi);

  form.setDescription(
    'Topkapı Üniversitesi\'nin 18–30 yaş gençlere yönelik ücretsiz yapay zeka ve ' +
    'girişimcilik eğitimine hoş geldin. Program 14 gün sürüyor: 8 gün eğitim, ' +
    '4 gün teknokent ve sanayi gezisi, 2 gün sertifika töreni.\n\n' +
    'Bu formu doldurmak yaklaşık 3 dakika sürer. Kontenjan sınırlıdır; ' +
    'şu an eğitimine devam etmeyen ve çalışmayan gençlere öncelik verilir. ' +
    '30 kontenjanın en az 20\'si kadın katılımcılara ayrılmıştır.\n' +
    'Sonuçlar telefon ve e-posta ile bildirilecektir.\n\n' +
    'Son başvuru: ' + AYARLAR.sonTarih + '\n' +
    'Bilgi: yapayzekaokulu.org\n\n' +
    'Bu program Avrupa Birliği tarafından Erasmus+ KA154 kapsamında ortak finanse edilmektedir.'
  );

  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Başvurun bize ulaştı, teşekkürler.\n\n' +
    'Değerlendirme sonrası seçilen katılımcılara telefon ve e-posta ile dönüş yapacağız. ' +
    'Bu arada yapayzekaokulu.org adresinden programı inceleyebilirsin.'
  );

  // ---- 1. Kişisel bilgiler ----
  form.addPageBreakItem().setTitle('Kişisel bilgiler');

  form.addTextItem()
    .setTitle('Ad Soyad')
    .setRequired(true);

  var yil = form.addTextItem()
    .setTitle('Doğum yılın')
    .setHelpText('Sadece yıl yaz. Örnek: 2002')
    .setRequired(true);
  yil.setValidation(
    FormApp.createTextValidation()
      .requireNumberBetween(AYARLAR.enKucukDogumYili, AYARLAR.enBuyukDogumYili)
      .setHelpText('Bu program 18–30 yaş arası gençler içindir.')
      .build()
  );

  form.addTextItem()
    .setTitle('Telefon numaran')
    .setHelpText('Seni buradan arayacağız. Örnek: 0555 555 55 55')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Yaşadığın il ve ilçe')
    .setRequired(true);

  // ---- 2. Durum ----
  form.addPageBreakItem().setTitle('Mevcut durumun')
    .setHelpText('Bu bölüm katılımcı seçiminde kullanılıyor. Olduğu gibi işaretle, dürüst cevap seni avantajlı kılar.');

  form.addMultipleChoiceItem()
    .setTitle('En son mezun olduğun okul')
    .setChoiceValues(['İlkokul', 'Ortaokul', 'Lise', 'Ön lisans', 'Lisans', 'Okulu yarıda bıraktım'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Şu an bir okula kayıtlı mısın?')
    .setChoiceValues(['Hayır, kayıtlı değilim', 'Evet, örgün öğrenciyim', 'Evet, açık öğretim öğrencisiyim'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Şu an çalışıyor musun?')
    .setChoiceValues(['Hayır, çalışmıyorum', 'Evet, tam zamanlı çalışıyorum', 'Evet, ara sıra veya geçici işlerde çalışıyorum'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Ne kadar süredir iş arıyorsun?')
    .setChoiceValues(['İş aramıyorum', '6 aydan az', '6 ay – 1 yıl', '1 yıldan fazla'])
    .setRequired(true);

  // ---- 3. Hazırlık ----
  form.addPageBreakItem().setTitle('Hazırlık ve ilgi alanların');

  form.addMultipleChoiceItem()
    .setTitle('Bilgisayar veya tablet erişimin var mı?')
    .setHelpText('Olmaması engel değil, dersler laboratuvarda yapılıyor.')
    .setChoiceValues(['Evet, kendi bilgisayarım var', 'Evet ama paylaşımlı veya sınırlı erişimim var', 'Hayır, sadece akıllı telefonum var'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Daha önce yapay zeka araçları (ChatGPT vb.) kullandın mı?')
    .setChoiceValues(['Hiç kullanmadım', 'Birkaç kez denedim', 'Düzenli kullanıyorum'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Hangi konular seni daha çok ilgilendiriyor?')
    .setHelpText('Birden fazla seçebilirsin.')
    .setChoiceValues([
      'Yapay zeka araçlarını öğrenmek',
      'İçerik ve görsel üretimi',
      'Yapay zeka ile chatbot ve otomasyon kurmak',
      'Kendi işimi kurmak, girişimcilik',
      'Teknokent ve sanayi gezileri',
      'İş modeli ve finansal planlama',
      'İş bulmak ve profesyonel ağ kurmak'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Bu eğitime neden katılmak istiyorsun?')
    .setHelpText('Kısa ve samimi yaz, iki üç cümle yeter. Güzel yazmana gerek yok, gerçek olsun yeter.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Aklında bir iş fikri veya proje fikri var mı?')
    .setHelpText('Varsa bir iki cümleyle anlat. Yoksa "yok" yazman yeterli, bu seçimi etkilemiyor.')
    .setRequired(false);

  // ---- 4. Katılım ----
  form.addPageBreakItem().setTitle('Katılım ve onay');

  form.addCheckboxItem()
    .setTitle('Derslere hangi günler gelebilirsin?')
    .setChoiceValues(['Hafta içi gündüz', 'Hafta içi akşam', 'Hafta sonu'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Eğitimle ilgili özel bir ihtiyacın var mı?')
    .setHelpText('Erişilebilirlik, ulaşım, çocuk bakımı gibi. Yoksa boş bırakabilirsin.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Bizi nereden duydun?')
    .setChoiceValues(['Afiş', 'Sosyal medya', 'Arkadaş veya aile', 'Üniversite web sitesi', 'İŞKUR veya gençlik merkezi'])
    .showOtherOption(true)
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Onaylar')
    .setChoiceValues([
      'Verdiğim bilgilerin doğru olduğunu beyan ederim.',
      'Kişisel verilerimin bu eğitimin yürütülmesi ve Erasmus+ raporlaması amacıyla 6698 sayılı KVKK kapsamında işlenmesine onay veriyorum.',
      'Eğitim duyuruları için bana telefon ve e-posta ile ulaşılmasına izin veriyorum.'
    ])
    .setRequired(true);

  // ---- Arşiv tablosu ----
  var arsiv = SpreadsheetApp.create('Yapay Zeka Okulu — Başvuru Arşivi');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, arsiv.getId());

  // ---- E-posta bildirimi tetikleyicisi ----
  ScriptApp.newTrigger('yeniBasvuruGeldi')
    .forForm(form)
    .onFormSubmit()
    .create();

  // ---- Sana bilgi maili ----
  var duzenle = form.getEditUrl();
  var canli = form.getPublishedUrl();
  var kisa = form.shortenFormUrl(canli);
  var tablo = arsiv.getUrl();

  MailApp.sendEmail({
    to: AYARLAR.bildirimEposta,
    subject: 'Yapay Zeka Okulu — başvuru formun hazır',
    htmlBody:
      '<p>Form, arşiv tablosu ve e-posta bildirimi kuruldu.</p>' +
      '<p><b>Siteye ve afişe koyacağın link (kısa):</b><br><a href="' + kisa + '">' + kisa + '</a></p>' +
      '<p><b>Formu düzenlemek için:</b><br><a href="' + duzenle + '">' + duzenle + '</a></p>' +
      '<p><b>Başvuru arşivi (Google Sheets):</b><br><a href="' + tablo + '">' + tablo + '</a></p>' +
      '<p>Her yeni başvuruda bu adrese bildirim gelecek. Tüm yanıtlar arşiv tablosunda birikiyor.</p>'
  });

  Logger.log('HAZIR');
  Logger.log('Kısa link : ' + kisa);
  Logger.log('Düzenleme : ' + duzenle);
  Logger.log('Arşiv     : ' + tablo);
}

/**
 * Her yeni başvuruda çalışır, sana özet e-posta atar.
 */
function yeniBasvuruGeldi(e) {
  try {
    var yanitlar = e.response.getItemResponses();
    var satirlar = [];
    var ad = '(isim yok)';

    for (var i = 0; i < yanitlar.length; i++) {
      var soru = yanitlar[i].getItem().getTitle();
      var cevap = yanitlar[i].getResponse();
      if (Array.isArray(cevap)) cevap = cevap.join(', ');
      if (soru === 'Ad Soyad') ad = cevap;
      satirlar.push('<tr><td style="padding:6px 14px 6px 0;color:#6b6880;vertical-align:top;white-space:nowrap"><b>' +
                    soru + '</b></td><td style="padding:6px 0">' + cevap + '</td></tr>');
    }

    MailApp.sendEmail({
      to: AYARLAR.bildirimEposta,
      subject: 'Yeni başvuru: ' + ad,
      htmlBody:
        '<div style="font-family:system-ui,sans-serif;font-size:14px;color:#14121f">' +
        '<h2 style="color:#3B2FBF;margin:0 0 4px">Yeni başvuru</h2>' +
        '<p style="color:#6b6880;margin:0 0 18px">Yapay Zeka Okulu · ' +
        Utilities.formatDate(new Date(), 'Europe/Istanbul', 'dd.MM.yyyy HH:mm') + '</p>' +
        '<table style="border-collapse:collapse">' + satirlar.join('') + '</table>' +
        '</div>'
    });
  } catch (hata) {
    Logger.log('Bildirim hatası: ' + hata);
  }
}
