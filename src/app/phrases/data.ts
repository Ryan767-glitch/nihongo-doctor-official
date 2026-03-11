export const languages = [
  { "id": "en", "name": "英語", "nameNative": "English" },
  { "id": "zh", "name": "中国語", "nameNative": "中文" },
  { "id": "ko", "name": "韓国語", "nameNative": "한국어" },
  { "id": "th", "name": "タイ語", "nameNative": "ภาษาไทย" },
  { "id": "vi", "name": "ベトナム語", "nameNative": "Tiếng Việt" },
  { "id": "ms", "name": "マレー・インドネシア語", "nameNative": "Bahasa Melayu / Indonesia" },
  { "id": "es", "name": "スペイン語", "nameNative": "Español" },
  { "id": "fr", "name": "フランス語", "nameNative": "Français" },
  { "id": "de", "name": "ドイツ語", "nameNative": "Deutsch" },
  { "id": "pt", "name": "ポルトガル語", "nameNative": "Português" },
  { "id": "ar", "name": "アラビア語", "nameNative": "العربية" }
];

export const phraseCategories = [
  {
    "id": "emergency",
    "title": "緊急・救急",
    "phrases": [
      {
        "ja": "救急車を呼んでください",
        "translations": {
          "en": { "text": "Please call an ambulance", "pron": "プリーズ・コール・アン・アンビュランス" },
          "zh": { "text": "请叫救护车", "pron": "チン・ジャオ・ジウフー・チョー" },
          "ko": { "text": "구급차를 불러주세요", "pron": "クグプチャルル・プロジュセヨ" },
          "th": { "text": "กรุณาเรียกรถพยาบาล", "pron": "カルナー・リアク・ロットパヤーバーン" },
          "vi": { "text": "Xin hãy gọi xe cứu thương", "pron": "シン・ハィ・ゴイ・セー・クー・トゥオン" },
          "ms": { "text": "Tolong panggil ambulans", "pron": "トロン・パンギル・アンブラン" },
          "es": { "text": "Por favor, llame a una ambulancia", "pron": "ポル・ファボール、リャメ・ア・ウナ・アンブランシア" },
          "fr": { "text": "S'il vous plaît, appelez une ambulance", "pron": "シルブプレ、アップレ・ユヌ・アンビュランス" },
          "de": { "text": "Bitte rufen Sie einen Krankenwagen", "pron": "ビッテ・ルーフェン・ズィー・アイネン・クランケンヴァーゲン" },
          "pt": { "text": "Por favor, chame uma ambulância", "pron": "ポル・ファボール、シャメ・ウマ・アンブランシア" },
          "ar": { "text": "يرجى الاتصال بسيارة الإسعاف", "pron": "ユルジャル・イティサール・ビサヤラティル・イスアーフ" }
        }
      },
      {
        "ja": "助けてください",
        "translations": {
          "en": { "text": "Please help me", "pron": "プリーズ・ヘルプ・ミー" },
          "zh": { "text": "请帮帮我", "pron": "チン・バン・バン・ウォ" },
          "ko": { "text": "도와주세요", "pron": "トワジュセヨ" },
          "th": { "text": "ได้โปรดช่วยด้วย", "pron": "ダイ・プロート・チュアイ・ドゥアイ" },
          "vi": { "text": "Xin hãy giúp tôi", "pron": "シン・ハィ・ジュープ・トイ" },
          "ms": { "text": "Tolong bantu saya", "pron": "トロン・バントゥ・サヤ" },
          "es": { "text": "Por favor, ayúdeme", "pron": "ポル・ファボール、アユデメ" },
          "fr": { "text": "S'il vous plaît, aidez-moi", "pron": "シルブプレ、エデ・モワ" },
          "de": { "text": "Bitte helfen Sie mir", "pron": "ビッテ・ヘルフェン・ズィー・ミア" },
          "pt": { "text": "Por favor, me ajude", "pron": "ポル・ファボール、ミ・アジュジ" },
          "ar": { "text": "الرجاء مساعدتي", "pron": "アラジャー・ムサーアダティー" }
        }
      },
      {
        "ja": "意識がありません",
        "translations": {
          "en": { "text": "Unconscious", "pron": "アンコンシャス" },
          "zh": { "text": "没有意识", "pron": "メイヨウ・イーシー" },
          "ko": { "text": "의식이 없습니다", "pron": "ウィシギ・オプスムニダ" },
          "th": { "text": "หมดสติ", "pron": "モット・サティ" },
          "vi": { "text": "Bất tỉnh", "pron": "バット・ティン" },
          "ms": { "text": "Tidak sedarkan diri", "pron": "ティダ・セダルカン・ディリ" },
          "es": { "text": "Inconsciente", "pron": "インコンシエンテ" },
          "fr": { "text": "Inconscient", "pron": "アンコンシアン" },
          "de": { "text": "Bewusstlos", "pron": "ベヴストロス" },
          "pt": { "text": "Inconsciente", "pron": "インコンシエンチ" },
          "ar": { "text": "فاقد الوعي", "pron": "ファーキドゥ・アルワーイ" }
        }
      },
      {
        "ja": "出血しています",
        "translations": {
          "en": { "text": "Bleeding", "pron": "ブリーディング" },
          "zh": { "text": "正在出血", "pron": "ジェンザイ・チュウシュエ" },
          "ko": { "text": "피가 나고 있습니다", "pron": "ピガ・ナゴ・イッスムニダ" },
          "th": { "text": "มีเลือดออก", "pron": "ミー・ルアット・オーク" },
          "vi": { "text": "Đang chảy máu", "pron": "ダン・チャイ・マウ" },
          "ms": { "text": "Berdarah", "pron": "ブルダラ" },
          "es": { "text": "Sangrando", "pron": "サングランド" },
          "fr": { "text": "Je saigne / Il saigne", "pron": "ジュ・セーニュ / イル・セーニュ" },
          "de": { "text": "Blutend", "pron": "ブルーテント" },
          "pt": { "text": "Sangrando", "pron": "サングランド" },
          "ar": { "text": "ينزف", "pron": "ヤンズィフ" }
        }
      },
      {
        "ja": "呼吸ができません",
        "translations": {
          "en": { "text": "Cannot breathe", "pron": "キャノット・ブリーズ" },
          "zh": { "text": "无法呼吸", "pron": "ウーファ・フーシー" },
          "ko": { "text": "숨을 쉴 수 없습니다", "pron": "スムル・スウィル・ス・オプスムニダ" },
          "th": { "text": "หายใจไม่ออก", "pron": "ハーイ・ジャイ・マイ・オーク" },
          "vi": { "text": "Không thể thở được", "pron": "コン・テー・トー・ドゥオク" },
          "ms": { "text": "Tidak boleh bernafas", "pron": "ティダ・ボレ・ブルナファス" },
          "es": { "text": "No puedo respirar", "pron": "ノ・プエド・レスピラール" },
          "fr": { "text": "Je ne peux pas respirer", "pron": "ジュ・ヌ・プ・パ・レスピレ" },
          "de": { "text": "Kann nicht atmen", "pron": "カン・ニヒト・アートメン" },
          "pt": { "text": "Não consigo respirar", "pron": "ナォン・コンスィゴ・レスピラール" },
          "ar": { "text": "لا أستطيع التنفس", "pron": "ラー・アスタティーウ・アッタナッフス" }
        }
      },
      {
        "ja": "アレルギーでショック状態です",
        "translations": {
          "en": { "text": "Anaphylaxis / Allergic shock", "pron": "アナフィラキシス / アレジック・ショック" },
          "zh": { "text": "过敏性休克", "pron": "グォミンシン・シュウクォ" },
          "ko": { "text": "알레르기 쇼크입니다", "pron": "アルレルギ・ショクイムニダ" },
          "th": { "text": "ช็อกเนื่องจากภูมิแพ้", "pron": "ショク・ヌアンジャーク・プームペー" },
          "vi": { "text": "Sốc phản vệ", "pron": "ソック・ファン・ヴェ" },
          "ms": { "text": "Kejutan alahan / anafilaksis", "pron": "クジュタン・アラハン / アナフィラクシス" },
          "es": { "text": "Choque alérgico / anafilaxia", "pron": "チョケ・アレルヒコ / アナフィラクシア" },
          "fr": { "text": "Choc allergique", "pron": "ショック・アレルジーク" },
          "de": { "text": "Allergischer Schock", "pron": "アレルギッシャー・ショック" },
          "pt": { "text": "Choque alérgico", "pron": "ショケ・アレルジコ" },
          "ar": { "text": "صدمة حساسية", "pron": "サドマトゥ・ハサーシーヤ" }
        }
      },
      {
        "ja": "近くの病院はどこですか",
        "translations": {
          "en": { "text": "Where is the nearest hospital?", "pron": "ウェア・イズ・ザ・ニアレスト・ホスピタル？" },
          "zh": { "text": "附近的医院在哪里？", "pron": "フージン・ディ・イーユェン・ザイ・ナァリ？" },
          "ko": { "text": "가까운 병원이 어디인가요?", "pron": "カッカウン・ビョンウォニ・オディインガヨ？" },
          "th": { "text": "โรงพยาบาลที่ใกล้ที่สุดอยู่ที่ไหน", "pron": "ローンパヤーバーン・ティー・グライ・ティースット・ユー・ティー・ナイ" },
          "vi": { "text": "Bệnh viện gần nhất ở đâu?", "pron": "ベン・ヴィエン・ガン・ニャット・オ・ダウ？" },
          "ms": { "text": "Di manakah hospital terdekat?", "pron": "ディ・マナカ・ホスピタル・トゥルデカッ？" },
          "es": { "text": "¿Dónde está el hospital más cercano?", "pron": "ドンデ・エスタ・エル・オスピタル・マス・セルカノ？" },
          "fr": { "text": "Où est l'hôpital le plus proche?", "pron": "ウ・エ・ロピタル・ル・プリュ・プロッシュ？" },
          "de": { "text": "Wo ist das nächste Krankenhaus?", "pron": "ヴォー・イスト・ダス・ネヒステ・クランケンハウス？" },
          "pt": { "text": "Onde fica o hospital mais próximo?", "pron": "オンジ・フィカ・オ・オスピタウ・マイス・プロスィモ？" },
          "ar": { "text": "أين أقرب مستشفى؟", "pron": "アイナ・アクラボ・ムスタッシュファ？" }
        }
      }
    ]
  },
  {
    "id": "reception",
    "title": "受付・予約",
    "phrases": [
      {
        "ja": "予約したいです",
        "translations": {
          "en": { "text": "I would like to make an appointment", "pron": "アイ・ウッド・ライク・トゥ・メイク・アン・アポイントメント" },
          "zh": { "text": "我想预约", "pron": "ウォ・シャン・ユィユェ" },
          "ko": { "text": "예약하고 싶습니다", "pron": "イェヤカゴ・シプスムニ다" },
          "th": { "text": "ฉันต้องการนัดหมาย", "pron": "チャン・トーンガーン・ナット・マーイ" },
          "vi": { "text": "Tôi muốn đặt lịch hẹn", "pron": "トイ・ムオン・ダット・リック・ヘン" },
          "ms": { "text": "Saya ingin membuat temujanji", "pron": "サヤ・インギン・ムンブアト・トゥムジャンジ" },
          "es": { "text": "Me gustaría hacer una cita", "pron": "メ・グスタリア・アセール・ウナ・シタ" },
          "fr": { "text": "Je voudrais prendre rendez-vous", "pron": "ジュ・ヴドレ・プランドル・ランデヴー" },
          "de": { "text": "Ich möchte einen Termin vereinbaren", "pron": "イッヒ・メヒテ・アイネン・テルミーン・フェアアインバーレン" },
          "pt": { "text": "Gostaria de marcar uma consulta", "pron": "ゴスタリア・ジ・マルカル・ウマ・コンスルタ" },
          "ar": { "text": "أرغب في تحديد موعد", "pron": "アルガボ・フィー・タフディード・マウアディ" }
        }
      },
      {
        "ja": "予約なしで診てもらえますか",
        "translations": {
          "en": { "text": "Can I see a doctor without an appointment?", "pron": "キャン・アイ・シー・ア・ドクター・ウィザウト・アン・アポイントメント？" },
          "zh": { "text": "没有预约可以看病吗？", "pron": "メイヨウ・ユィユェ・クァイー・カンビン・マ？" },
          "ko": { "text": "예약 없이 진료를 받을 수 있나요?", "pron": "イェヤク・オプシ・チルリョルル・パドゥル・ス・インナヨ？" },
          "th": { "text": "ไม่ได้นัดไว้พบหมอได้ไหม", "pron": "マイ・ダイ・ナット・ワイ・ポップ・モー・ダイ・マイ" },
          "vi": { "text": "Không có lịch hẹn có khám được không?", "pron": "コン・コ・リック・ヘン・コ・カーム・ドゥオク・コン？" },
          "ms": { "text": "Bolehkah saya berjumpa doktor tanpa temujanji?", "pron": "ボレカッ・サヤ・ブルジュンパ・ドクトール・タンパ・トゥムジャンジ？" },
          "es": { "text": "¿Puedo ver a un médico sin cita previa?", "pron": "プエド・ベール・ア・ウン・メディコ・シン・シタ・プレビア？" },
          "fr": { "text": "Puis-je voir un médecin sans rendez-vous?", "pron": "ピュイジュ・ヴォアール・アン・メドサン・サン・ランデヴー？" },
          "de": { "text": "Kann ich ohne Termin einen Arzt aufsuchen?", "pron": "カン・イッヒ・オーネ・テルミーン・アイネン・アルツト・アウフズーヘン？" },
          "pt": { "text": "Posso ver um médico sem marcação?", "pron": "ポッソ・ベール・ウン・メジコ・セン・マルカサゥン？" },
          "ar": { "text": "هل يمكنني رؤية طبيب بدون موعد؟", "pron": "ハル・ユムキヌニ・ルヤト・タビーブ・ビドゥーン・マウアディ？" }
        }
      },
      {
        "ja": "保険証はこちらです",
        "translations": {
          "en": { "text": "Here is my insurance card", "pron": "ヒア・イズ・マイ・インシュアランス・カード" },
          "zh": { "text": "这是我的保险卡", "pron": "ジェシ・ウォディ・バオシエンカ" },
          "ko": { "text": "여기에 보험증이 있습니다", "pron": "ヨギエ・ポホムジュンギ・イッスムニダ" },
          "th": { "text": "นี่คือบัตรประกันของฉัน", "pron": "ニー・クー・バット・プラガン・コーン・チャン" },
          "vi": { "text": "Đây là thẻ bảo hiểm của tôi", "pron": "デイ・ラ・テ・バオ・ヒエム・クア・トイ" },
          "ms": { "text": "Ini kad insurans saya", "pron": "イニ・カド・インシュランス・サヤ" },
          "es": { "text": "Aquí tiene mi tarjeta de seguro", "pron": "アキ・ティエネ・ミ・タルヘタ・デ・セグロ" },
          "fr": { "text": "Voici ma carte d'assurance", "pron": "ヴワスィ・マ・カルト・ダシュランス" },
          "de": { "text": "Hier ist meine Versicherungskarte", "pron": "ヒア・イスト・マイネ・フェルジヒェルングスカルテ" },
          "pt": { "text": "Aqui está o meu cartão de seguro", "pron": "アキ・エスタ・オ・メウ・カルタォン・ジ・セグロ" },
          "ar": { "text": "هذه بطاقة التأمين الخاصة بي", "pron": "ハーズィヒ・ビターカト・アッタミーン・アルハーサ・ビー" }
        }
      },
      {
        "ja": "日本語を話せる方はいますか",
        "translations": {
          "en": { "text": "Is there anyone who speaks Japanese?", "pron": "イズ・ゼア・エニワン・フー・スピークス・ジャパニーズ？" },
          "zh": { "text": "有人会说日语吗？", "pron": "ヨウレン・フイシュオ・リーユゥ・マ？" },
          "ko": { "text": "일본어를 할 줄 아는 분이 있나요?", "pron": "イルボノルル・ハル・チュル・アーヌン・ブニ・インナヨ？" },
          "th": { "text": "มีใครพูดภาษาญี่ปุ่นได้บ้างไหม", "pron": "ミー・クライ・プート・パーサー・イープン・ダイ・バーン・マイ" },
          "vi": { "text": "Có ai nói được tiếng Nhật không?", "pron": "コ・アイ・ノイ・ドゥオク・ティエン・ニャット・コン？" },
          "ms": { "text": "Adakah sesiapa yang boleh berbahasa Jepun?", "pron": "アダカ・セシアパ・ヤン・ボレ・ブルバハサ・ジュプン？" },
          "es": { "text": "¿Hay alguien que hable japonés?", "pron": "アイ・アルギエン・ケ・アブレ・ハポネス？" },
          "fr": { "text": "Y a-t-il quelqu'un qui parle japonais?", "pron": "ヤ・ティル・ケルカン・キ・パルル・ジャポネ？" },
          "de": { "text": "Spricht hier jemand Japanisch?", "pron": "シュプリヒト・ヒア・イェーマント・ヤパーニッシュ？" },
          "pt": { "text": "Tem alguém que fale japonês?", "pron": "テン・アウゲン・ケ・ファレ・ジャポネス？" },
          "ar": { "text": "هل يوجد أحد يتحدث اليابانية؟", "pron": "ハル・ユウジャドゥ・アハドゥン・ヤタハッダス・アルヤーバーニーヤ？" }
        }
      },
      {
        "ja": "初診です",
        "translations": {
          "en": { "text": "This is my first visit", "pron": "ディス・イズ・マイ・ファースト・ビジット" },
          "zh": { "text": "我是初诊", "pron": "ウォ・シ・チュージェン" },
          "ko": { "text": "초진입니다", "pron": "チョジニムニダ" },
          "th": { "text": "มาเป็นครั้งแรก", "pron": "マー・ペン・クラン・レーク" },
          "vi": { "text": "Đây là lần đầu tôi đến khám", "pron": "デイ・ラ・ラン・ダウ・トイ・デン・カーム" },
          "ms": { "text": "Ini lawatan pertama saya", "pron": "イニ・ラワタン・プタマ・サヤ" },
          "es": { "text": "Es mi primera visita", "pron": "エス・ミ・プリメラ・ビシタ" },
          "fr": { "text": "C'est ma première visite", "pron": "セ・マ・プルミエール・ヴィジット" },
          "de": { "text": "Ich bin zum ersten Mal hier", "pron": "イッヒ・ビン・ツム・エルステェン・マール・ヒア" },
          "pt": { "text": "É a minha primeira consulta", "pron": "エ・ア・ミーニャ・プリメイラ・コンスルタ" },
          "ar": { "text": "هذه هي زيارتي الأولى", "pron": "ハーズィヒ・ヒヤ・ズィヤーラティ・アルウーラー" }
        }
      },
      {
        "ja": "待ち時間はどれくらいですか",
        "translations": {
          "en": { "text": "How long is the wait?", "pron": "ハウ・ロング・イズ・ザ・ウェイト？" },
          "zh": { "text": "需要等多久？", "pron": "シューヤオ・デン・ドゥオジウ？" },
          "ko": { "text": "대기 시간은 얼마나 되나요?", "pron": "テギ・シガヌン・オルマナ・ドェナ요？" },
          "th": { "text": "ต้องรอนานแค่ไหน", "pron": "トーン・ロー・ナーン・ケー・ナイ" },
          "vi": { "text": "Thời gian chờ là bao lâu?", "pron": "トイ・ザン・チョー・ラ・バオ・ラウ？" },
          "ms": { "text": "Berapa lama masa menunggu?", "pron": "ブラパ・ラマ・マサ・ムヌング？" },
          "es": { "text": "¿Cuánto tiempo de espera hay?", "pron": "クアント・ティエンポ・デ・エスペラ・アイ？" },
          "fr": { "text": "Combien de temps faut-il attendre?", "pron": "コンビヤン・ドゥ・タン・フォーティル・アタンドル？" },
          "de": { "text": "Wie lange ist die Wartezeit?", "pron": "ヴィー・ランゲ・イスト・ディー・ヴァルテツァイト？" },
          "pt": { "text": "Qual é o tempo de espera?", "pron": "クアウ・エ・オ・テンポ・ジ・エスペラ？" },
          "ar": { "text": "كم من الوقت عليّ الانتظار؟", "pron": "カム・ミナル・ワクトゥ・アライヤ・アルインティザール？" }
        }
      }
    ]
  },
  {
    "id": "symptoms",
    "title": "症状の説明",
    "phrases": [
      {
        "ja": "頭が痛いです",
        "translations": {
          "en": { "text": "I have a headache", "pron": "アイ・ハヴ・ア・ヘデック" },
          "zh": { "text": "我头痛", "pron": "ウォ・トウトン" },
          "ko": { "text": "머리가 아픕니다", "pron": "モリガ・アプムニダ" },
          "th": { "text": "ปวดหัว", "pron": "プアット・フア" },
          "vi": { "text": "Tôi bị đau đầu", "pron": "トイ・ビ・ダウ・ダウ" },
          "ms": { "text": "Saya sakit kepala", "pron": "サヤ・サキット・ケパラ" },
          "es": { "text": "Tengo dolor de cabeza", "pron": "テンゴ・ドロール・デ・カベサ" },
          "fr": { "text": "J'ai mal à la tête", "pron": "ジェ・マル・ア・ラ・テート" },
          "de": { "text": "Ich habe Kopfschmerzen", "pron": "イッヒ・ハーベ・コプフシュメルツェン" },
          "pt": { "text": "Tenho dor de cabeça", "pron": "テニョ・ドール・ジ・カベッサ" },
          "ar": { "text": "أعاني من صداع", "pron": "ウアニ・ミン・スダーウ" }
        }
      },
      {
        "ja": "熱があります",
        "translations": {
          "en": { "text": "I have a fever", "pron": "アイ・ハヴ・ア・フィーバー" },
          "zh": { "text": "我发烧了", "pron": "ウォ・ファーシャオ・ラ" },
          "ko": { "text": "열이 납니다", "pron": "ヨリ・ナムニダ" },
          "th": { "text": "ฉันมีไข้", "pron": "チャン・ミー・カイ" },
          "vi": { "text": "Tôi bị sốt", "pron": "トイ・ビ・ソット" },
          "ms": { "text": "Saya demam", "pron": "サヤ・デマム" },
          "es": { "text": "Tengo fiebre", "pron": "テンゴ・フィエブレ" },
          "fr": { "text": "J'ai de la fièvre", "pron": "ジェ・ドゥ・ラ・フィエーヴル" },
          "de": { "text": "Ich habe Fieber", "pron": "イッヒ・ハーベ・フィーバー" },
          "pt": { "text": "Estou com febre", "pron": "エストゥ・コン・フェブレ" },
          "ar": { "text": "أعاني من الحمى", "pron": "ウアニ・ミナル・フンマ" }
        }
      },
      {
        "ja": "お腹が痛いです",
        "translations": {
          "en": { "text": "I have a stomachache", "pron": "アイ・ハヴ・ア・ストマケイク" },
          "zh": { "text": "我肚子痛", "pron": "ウォ・ドゥズ・トン" },
          "ko": { "text": "배가 아픕니다", "pron": "ペ가・アプムニダ" },
          "th": { "text": "ปวดท้อง", "pron": "プアット・トーン" },
          "vi": { "text": "Tôi bị đau bụng", "pron": "トイ・ビ・ダウ・ブン" },
          "ms": { "text": "Saya sakit perut", "pron": "サヤ・サキット・プルッ" },
          "es": { "text": "Tengo dolor de estómago", "pron": "テンゴ・ドロール・デ・エストマゴ" },
          "fr": { "text": "J'ai mal au ventre", "pron": "ジェ・マル・オ・ヴァントル" },
          "de": { "text": "Ich habe Bauchschmerzen", "pron": "イッヒ・ハーベ・バウホシュメルツェン" },
          "pt": { "text": "Tenho dor de estômago", "pron": "テニョ・ドール・ジ・エストンマゴ" },
          "ar": { "text": "أعاني من ألم في المعدة", "pron": "ウアニ・ミン・アラム・フィル・マイダ" }
        }
      },
      {
        "ja": "吐き気がします",
        "translations": {
          "en": { "text": "I feel nauseous", "pron": "アイ・フィール・ノーシャス" },
          "zh": { "text": "觉得恶心想吐", "pron": "ジュエドゥ・ウーシン・シアントゥ" },
          "ko": { "text": "구역질이 납니다", "pron": "クヨクチリ・ナムニダ" },
          "th": { "text": "รู้สึกคลื่นไส้", "pron": "ルースック・クルーンサイ" },
          "vi": { "text": "Tôi buồn nôn", "pron": "トイ・ブオン・ノン" },
          "ms": { "text": "Saya rasa loya", "pron": "サヤ・ラサ・ロヤ" },
          "es": { "text": "Tengo náuseas", "pron": "テンゴ・ナウセアス" },
          "fr": { "text": "J'ai la nausée", "pron": "ジェ・ラ・ノゼ" },
          "de": { "text": "Mir ist übel", "pron": "ミア・イスト・ウーベル" },
          "pt": { "text": "Sinto náuseas", "pron": "スィント・ナウゼアス" },
          "ar": { "text": "أشعر بالغثيان", "pron": "アシュアル・ビルガサヤン" }
        }
      },
      {
        "ja": "咳が出ます",
        "translations": {
          "en": { "text": "I have a cough", "pron": "アイ・ハヴ・ア・カフ" },
          "zh": { "text": "我咳嗽", "pron": "ウォ・クーソウ" },
          "ko": { "text": "기침이 납니다", "pron": "キチミ・ナムニダ" },
          "th": { "text": "ไอ", "pron": "アイ" },
          "vi": { "text": "Tôi bị ho", "pron": "トイ・ビ・ホー" },
          "ms": { "text": "Saya batuk", "pron": "サヤ・バトク" },
          "es": { "text": "Tengo tos", "pron": "テンゴ・トス" },
          "fr": { "text": "Je tousse", "pron": "ジュ・トゥス" },
          "de": { "text": "Ich habe Husten", "pron": "イッヒ・ハーベ・フステン" },
          "pt": { "text": "Tenho tosse", "pron": "テニョ・トッシ" },
          "ar": { "text": "أعاني من السعال", "pron": "ウアニ・ミナス・スアール" }
        }
      },
      {
        "ja": "下痢をしています",
        "translations": {
          "en": { "text": "I have diarrhea", "pron": "アイ・ハヴ・ダイアリア" },
          "zh": { "text": "我拉肚子", "pron": "ウォ・ラードゥーズ" },
          "ko": { "text": "설사를 합니다", "pron": "ソルサルル・ハムニダ" },
          "th": { "text": "ท้องเสีย", "pron": "トーン・スィア" },
          "vi": { "text": "Tôi bị tiêu chảy", "pron": "トイ・ビ・ティウ・チャイ" },
          "ms": { "text": "Saya cirit-birit", "pron": "サヤ・チリッビリッ" },
          "es": { "text": "Tengo diarrea", "pron": "テンゴ・ディアレア" },
          "fr": { "text": "J'ai la diarrhée", "pron": "ジェ・ラ・ディアレ" },
          "de": { "text": "Ich habe Durchfall", "pron": "イッヒ・ハーベ・ドゥルヒファル" },
          "pt": { "text": "Estou com diarreia", "pron": "エストゥ・コン・ジアレア" },
          "ar": { "text": "أعاني من الإسهال", "pron": "ウアニ・ミナル・イスハール" }
        }
      },
      {
        "ja": "便秘です",
        "translations": {
          "en": { "text": "I am constipated", "pron": "アイ・アム・コンスティペイティッド" },
          "zh": { "text": "我便秘了", "pron": "ウォ・ビエンミー・ラ" },
          "ko": { "text": "변비가 있습니다", "pron": "ピョンビガ・イッスムニダ" },
          "th": { "text": "ท้องผูก", "pron": "トーン・プーク" },
          "vi": { "text": "Tôi bị táo bón", "pron": "トイ・ビ・タオ・ボン" },
          "ms": { "text": "Saya sembelit", "pron": "サヤ・センベリッ" },
          "es": { "text": "Estoy estreñido/a", "pron": "エストイ・エストレニード（ダ）" },
          "fr": { "text": "Je suis constipé(e)", "pron": "ジュ・スイ・コンスティペ" },
          "de": { "text": "Ich habe Verstopfung", "pron": "イッヒ・ハーベ・フェルシュトップフング" },
          "pt": { "text": "Estou com prisão de ventre", "pron": "エストゥ・コン・プリザォン・ジ・ヴェントレ" },
          "ar": { "text": "أعاني من الإمساك", "pron": "ウアニ・ミナル・イムサーク" }
        }
      },
      {
        "ja": "めまいがします",
        "translations": {
          "en": { "text": "I feel dizzy", "pron": "アイ・フィール・ディジー" },
          "zh": { "text": "我觉得头晕", "pron": "ウォ・ジュエドゥ・トウユン" },
          "ko": { "text": "어지럽습니다", "pron": "オジロプスムニダ" },
          "th": { "text": "รู้สึกวิงเวียนศีรษะ", "pron": "ルースック・ウィンウィヤン・シーサ" },
          "vi": { "text": "Tôi chóng mặt", "pron": "トイ・チョン・マット" },
          "ms": { "text": "Saya pening kepala", "pron": "サヤ・プニン・ケパラ" },
          "es": { "text": "Me siento mareado/a", "pron": "メ・シエント・マレアード（ダ）" },
          "fr": { "text": "J'ai des vertiges", "pron": "ジェ・デ・ヴェルティージュ" },
          "de": { "text": "Mir ist schwindelig", "pron": "ミア・イスト・シュヴィンデリヒ" },
          "pt": { "text": "Estou com tonturas", "pron": "エストゥ・コン・トントゥラス" },
          "ar": { "text": "أشعر بالدوار", "pron": "アシュアル・ビッドゥワール" }
        }
      },
      {
        "ja": "喉が痛いです",
        "translations": {
          "en": { "text": "I have a sore throat", "pron": "アイ・ハヴ・ア・ソア・スロート" },
          "zh": { "text": "我喉咙痛", "pron": "ウォ・ホウロン・トン" },
          "ko": { "text": "목이 아픕니다", "pron": "モギ・アプムニダ" },
          "th": { "text": "เจ็บคอ", "pron": "ジェップ・コー" },
          "vi": { "text": "Tôi bị đau họng", "pron": "トイ・ビ・ダウ・ホン" },
          "ms": { "text": "Saya sakit tekak", "pron": "サヤ・サキット・テカク" },
          "es": { "text": "Tengo dolor de garganta", "pron": "テンゴ・ドロール・デ・ガルガンタ" },
          "fr": { "text": "J'ai mal à la gorge", "pron": "ジェ・マル・ア・ラ・ゴルジュ" },
          "de": { "text": "Ich habe Halsschmerzen", "pron": "イッヒ・ハーベ・ハルスシュメルツェン" },
          "pt": { "text": "Tenho dor de garganta", "pron": "テニョ・ドール・ジ・ガルガンタ" },
          "ar": { "text": "أعاني من التهاب في الحلق", "pron": "ウアニ・ミン・イルティハーブ・フィル・ハルク" }
        }
      },
      {
        "ja": "胸が痛いです",
        "translations": {
          "en": { "text": "I have chest pain", "pron": "アイ・ハヴ・チェスト・ペイン" },
          "zh": { "text": "我胸痛", "pron": "ウォ・ション・トン" },
          "ko": { "text": "가슴이 아픕니다", "pron": "カースミ・アプムニダ" },
          "th": { "text": "เจ็บหน้าอก", "pron": "ジェップ・ナー・オク" },
          "vi": { "text": "Tôi bị đau ngực", "pron": "トイ・ビ・ダウ・グック" },
          "ms": { "text": "Saya sakit dada", "pron": "サヤ・サキット・ダダ" },
          "es": { "text": "Tengo dolor en el pecho", "pron": "テンゴ・ドロール・エン・エル・ペチョ" },
          "fr": { "text": "J'ai mal à la poitrine", "pron": "ジェ・マル・ア・ラ・ポワトリーヌ" },
          "de": { "text": "Ich habe Brustschmerzen", "pron": "イッヒ・ハーベ・ブルストシュメルツェン" },
          "pt": { "text": "Tenho dor no peito", "pron": "テニョ・ドール・ノ・ペイト" },
          "ar": { "text": "أعاني من ألم في الصدر", "pron": "ウアニ・ミン・アラム・フィス・サドル" }
        }
      },
      {
        "ja": "背中が痛いです",
        "translations": {
          "en": { "text": "I have back pain", "pron": "アイ・ハヴ・バック・ペイン" },
          "zh": { "text": "我背痛", "pron": "ウォ・ベイトン" },
          "ko": { "text": "등이 아픕니다", "pron": "トゥンギ・アプムニダ" },
          "th": { "text": "ปวดหลัง", "pron": "プアット・ラン" },
          "vi": { "text": "Tôi đau lưng", "pron": "トイ・ダウ・ルン" },
          "ms": { "text": "Saya sakit belakang", "pron": "サヤ・サキット・ベラカン" },
          "es": { "text": "Me duele la espalda", "pron": "メ・ドゥエレ・ラ・エスパルダ" },
          "fr": { "text": "J'ai mal au dos", "pron": "ジェ・マル・オ・ド" },
          "de": { "text": "Ich habe Rückenschmerzen", "pron": "イッヒ・ハーベ・リュッケンシュメルツェン" },
          "pt": { "text": "Tenho dor nas costas", "pron": "テニョ・ドール・ナス・コスタス" },
          "ar": { "text": "أعاني من ألم في ظهري", "pron": "ウアニ・ミン・アラム・フィ・ザハリー" }
        }
      },
      {
        "ja": "歯が痛いです",
        "translations": {
          "en": { "text": "I have a toothache", "pron": "アイ・ハヴ・ア・トゥーセイク" },
          "zh": { "text": "我牙痛", "pron": "ウォ・ヤー・トン" },
          "ko": { "text": "치통이 있습니다", "pron": "チトンギ・イッスムニダ" },
          "th": { "text": "ปวดฟัน", "pron": "プアット・ファン" },
          "vi": { "text": "Tôi bị đau răng", "pron": "トイ・ビ・ダウ・ラン" },
          "ms": { "text": "Saya sakit gigi", "pron": "サヤ・サキット・ギギ" },
          "es": { "text": "Tengo dolor de muelas", "pron": "テンゴ・ドロール・デ・ムエラス" },
          "fr": { "text": "J'ai mal aux dents", "pron": "ジェ・マル・オ・ダン" },
          "de": { "text": "Ich habe Zahnschmerzen", "pron": "イッヒ・ハーベ・ツァーンシュメルツェン" },
          "pt": { "text": "Tenho dor de dentes", "pron": "テニョ・ドール・ジ・デンチス" },
          "ar": { "text": "أعاني من ألم في الأسنان", "pron": "ウアニ・ミン・アラム・フィル・アスナーン" }
        }
      },
      {
        "ja": "目がかゆいです",
        "translations": {
          "en": { "text": "My eyes are itchy", "pron": "マイ・アイズ・アー・イッチー" },
          "zh": { "text": "我的眼睛发痒", "pron": "ウォディ・イェンジン・ファヤン" },
          "ko": { "text": "눈이 가렵습니다", "pron": "ヌニ・カリョプスムニダ" },
          "th": { "text": "คันตา", "pron": "カン・ター" },
          "vi": { "text": "Mắt tôi bị ngứa", "pron": "マット・トイ・ビ・ングア" },
          "ms": { "text": "Mata saya gatal", "pron": "マタ・サヤ・ガタル" },
          "es": { "text": "Me pican los ojos", "pron": "メ・ピカン・ロス・オホス" },
          "fr": { "text": "J'ai les yeux qui grattent", "pron": "ジェ・レ・ズュ・キ・グラット" },
          "de": { "text": "Meine Augen jucken", "pron": "マイネ・アウゲン・ユッケン" },
          "pt": { "text": "Meus olhos estão coçando", "pron": "メウス・オーリョス・エスタォン・コッサンド" },
          "ar": { "text": "عيناي تؤلمانني", "pron": "عيناي تؤلمانني (アイナーヤ・トゥアリマーナニ) *かゆみの意味が含まれることもあります" }
        }
      },
      {
        "ja": "肌に発疹があります",
        "translations": {
          "en": { "text": "I have a rash", "pron": "アイ・ハヴ・ア・ラッシュ" },
          "zh": { "text": "我长了皮疹", "pron": "ウォ・ジャンラ・ピーチェン" },
          "ko": { "text": "피부에 발진이 생겼습니다", "pron": "ピブエ・パルチニ・センギョッスムニダ" },
          "th": { "text": "มีผื่นที่ผิวหนัง", "pron": "ミー・プーン・ティー・ピウナン" },
          "vi": { "text": "Tôi bị nổi ban", "pron": "トイ・ビ・ノイ・バン" },
          "ms": { "text": "Saya ada ruam pada kulit", "pron": "サヤ・アダ・ルアム・パダ・クリット" },
          "es": { "text": "Tengo un sarpullido", "pron": "テンゴ・ウン・サルプジード" },
          "fr": { "text": "J'ai une éruption cutanée", "pron": "ジェ・ユヌ・エリュプション・キュタネ" },
          "de": { "text": "Ich habe einen Hautausschlag", "pron": "イッヒ・ハーベ・アイネン・ハウトアウスシュラーク" },
          "pt": { "text": "Tenho uma erupção cutânea", "pron": "テニョ・ウマ・エルプサォン・クタンネア" },
          "ar": { "text": "لدي طفح جلدي", "pron": "ラダイヤ・タッフ・ジルディ" }
        }
      },
      {
        "ja": "アレルギーがあります",
        "translations": {
          "en": { "text": "I have allergies", "pron": "アイ・ハヴ・アレジーズ" },
          "zh": { "text": "我有过敏症", "pron": "ウォ・ヨウ・グォミンジェン" },
          "ko": { "text": "알레르기가 있습니다", "pron": "アルレルギガ・イッスムニダ" },
          "th": { "text": "ฉันเป็นภูมิแพ้", "pron": "チャン・ペン・プームペー" },
          "vi": { "text": "Tôi bị dị ứng", "pron": "トイ・ビ・ズィ・ウン" },
          "ms": { "text": "Saya ada alahan", "pron": "サヤ・アダ・アラハン" },
          "es": { "text": "Tengo alergias", "pron": "テンゴ・アレルヒアス" },
          "fr": { "text": "J'ai des allergies", "pron": "ジェ・デザレルジー" },
          "de": { "text": "Ich habe Allergien", "pron": "イッヒ・ハーベ・アレルギエン" },
          "pt": { "text": "Tenho alergias", "pron": "テニョ・アレルジアス" },
          "ar": { "text": "أعاني من حساسية", "pron": "ウアニ・ミン・ハサーシーヤ" }
        }
      },
      {
        "ja": "〇〇にアレルギーがあります",
        "translations": {
          "en": { "text": "I am allergic to ○○", "pron": "アイ・アム・アレジック・トゥ・マルマル" },
          "zh": { "text": "我对○○过敏", "pron": "ウォ・ドゥイ・マルマル・グォミン" },
          "ko": { "text": "○○에 알레르기가 있습니다", "pron": "マルマルエ・アルレルギガ・イッスムニダ" },
          "th": { "text": "ฉันแพ้○○", "pron": "チャン・ペー・マルマル" },
          "vi": { "text": "Tôi dị ứng với ○○", "pron": "トイ・ズィ・ウン・ヴォイ・マルマル" },
          "ms": { "text": "Saya alah kepada ○○", "pron": "サヤ・アラ・クパダ・マルマル" },
          "es": { "text": "Soy alérgico/a a ○○", "pron": "ソイ・アレルヒコ（カ）・ア・マルマル" },
          "fr": { "text": "Je suis allergique à ○○", "pron": "ジュ・スイ・アレルジーク・ア・マルマル" },
          "de": { "text": "Ich bin allergisch gegen ○○", "pron": "イッヒ・ビン・アレルギッシュ・ゲーゲン・マルマル" },
          "pt": { "text": "Sou alérgico(a) a ○○", "pron": "ソウ・アレルジコ（カ）・ア・マルマル" },
          "ar": { "text": "لدي حساسية من ○○", "pron": "ラダイヤ・ハサーシーヤ・ミン・マルマル" }
        }
      },
      {
        "ja": "妊娠しています",
        "translations": {
          "en": { "text": "I am pregnant", "pron": "アイ・アム・プレグナント" },
          "zh": { "text": "我怀孕了", "pron": "ウォ・ホワイヤン・ラ" },
          "ko": { "text": "임신 중입니다", "pron": "イムシン・ジュンイムニダ" },
          "th": { "text": "ฉันตั้งครรภ์", "pron": "チャン・タン・カン" },
          "vi": { "text": "Tôi đang mang thai", "pron": "トイ・ダン・マン・タイ" },
          "ms": { "text": "Saya hamil", "pron": "サヤ・ハミル" },
          "es": { "text": "Estoy embarazada", "pron": "エストイ・エンバラサーダ" },
          "fr": { "text": "Je suis enceinte", "pron": "ジュ・スイ・アンサント" },
          "de": { "text": "Ich bin schwanger", "pron": "イッヒ・ビン・シュヴァンガー" },
          "pt": { "text": "Estou grávida", "pron": "エストゥ・グラビダ" },
          "ar": { "text": "أنا حامل", "pron": "アナ・ハーミル" }
        }
      },
      {
        "ja": "妊娠○ヶ月です",
        "translations": {
          "en": { "text": "I am ○ months pregnant", "pron": "アイ・アム・マル・マンス・プレグナント" },
          "zh": { "text": "我怀孕○个月了", "pron": "ウォ・ホワイヤン・マル・ガ・ユェ・ラ" },
          "ko": { "text": "임신 ○개월입니다", "pron": "イム신・マル・ゲウォリムニダ" },
          "th": { "text": "ฉันตั้งครรภ์ ○ เดือน", "pron": "チャン・タン・カン・マル・ドゥアン" },
          "vi": { "text": "Tôi mang thai ○ tháng", "pron": "トイ・マン・タイ・マル・タン" },
          "ms": { "text": "Saya hamil ○ bulan", "pron": "サヤ・ハミル・マル・ブラン" },
          "es": { "text": "Tengo ○ meses de embarazo", "pron": "テンゴ・マル・メセス・デ・エンバラソ" },
          "fr": { "text": "Je suis enceinte de ○ mois", "pron": "ジュ・スイ・アンサント・ドゥ・マル・モワ" },
          "de": { "text": "Ich bin im ○. Monat schwanger", "pron": "イッヒ・ビン・イム・マル・モーナト・シュヴァンガー" },
          "pt": { "text": "Estou grávida de ○ meses", "pron": "エストゥ・グラビダ・ジ・マル・メセス" },
          "ar": { "text": "أنا حامل في الشهر ○", "pron": "アナ・ハーミル・フィッシュ・シャフル・マル" }
        }
      },
      {
        "ja": "持病があります",
        "translations": {
          "en": { "text": "I have a pre-existing condition", "pron": "アイ・ハヴ・ア・プリエグジスティング・コンディション" },
          "zh": { "text": "我有慢性病", "pron": "ウォ・ヨウ・マンシンビン" },
          "ko": { "text": "지병이 있습니다", "pron": "チビョンギ・イッスムニダ" },
          "th": { "text": "ฉันมีโรคประจำตัว", "pron": "チャン・ミー・ローク・プラジャムトゥア" },
          "vi": { "text": "Tôi có bệnh nền", "pron": "トイ・コ・ベン・ネン" },
          "ms": { "text": "Saya ada penyakit sedia ada", "pron": "サヤ・アダ・プニャキット・セディア・アダ" },
          "es": { "text": "Tengo una condición médica preexistente", "pron": "テンゴ・ウナ・コンディシオン・メディカ・プレエキシステンテ" },
          "fr": { "text": "J'ai une maladie préexistante", "pron": "ジェ・ユヌ・マラディー・プレエグジスタント" },
          "de": { "text": "Ich habe eine Vorerkrankung", "pron": "イッヒ・ハーベ・アイネ・フォアエァクランクング" },
          "pt": { "text": "Tenho uma doença preexistente", "pron": "テニョ・ウマ・ドエンサ・プレエジステンチ" },
          "ar": { "text": "لدي حالة طبية سابقة", "pron": "ラダイヤ・ハーラ・ティビーヤ・サービカ" }
        }
      }
    ]
  }
];
