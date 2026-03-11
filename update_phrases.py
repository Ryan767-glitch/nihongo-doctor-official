import json
import time
import os
try:
    from deep_translator import GoogleTranslator
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "deep-translator"])
    from deep_translator import GoogleTranslator

# Target languages and their translation codes
lang_map = {
    "en": {"code": "en", "native": "English"},
    "zh": {"code": "zh-CN", "native": "中文"},
    "ko": {"code": "ko", "native": "한국어"},
    "th": {"code": "th", "native": "ภาษาไทย"},
    "vi": {"code": "vi", "native": "Tiếng Việt"},
    "ms": {"code": "ms", "native": "Bahasa Melayu / Indonesia"},
    "es": {"code": "es", "native": "Español"},
    "fr": {"code": "fr", "native": "Français"},
    "de": {"code": "de", "native": "Deutsch"},
    "pt": {"code": "pt", "native": "Português"},
    "ar": {"code": "ar", "native": "العربية"}
}

categories = [
    {
        "id": "emergency",
        "icon": "🚨",
        "title": "緊急・救急",
        "phrases": [
            "救急車を呼んでください",
            "助けてください",
            "意識がありません",
            "出血しています",
            "呼吸ができません",
            "アレルギーでショック状態です",
            "近くの病院はどこですか"
        ]
    },
    {
        "id": "reception",
        "icon": "🏥",
        "title": "受付・予約",
        "phrases": [
            "予約したいです",
            "予約なしで診てもらえますか",
            "保険証はこちらです",
            "日本語を話せる方はいますか",
            "初診です",
            "待ち時間はどれくらいですか"
        ]
    },
    {
        "id": "symptoms",
        "icon": "🩺",
        "title": "症状の説明",
        "phrases": [
            "頭が痛いです",
            "熱があります",
            "お腹が痛いです",
            "吐き気がします",
            "咳が出ます",
            "下痢をしています",
            "便秘です",
            "めまいがします",
            "喉が痛いです",
            "胸が痛いです",
            "背中が痛いです",
            "歯が痛いです",
            "目がかゆいです",
            "肌に発疹があります",
            "アレルギーがあります",
            "〇〇にアレルギーがあります",
            "妊娠しています",
            "妊娠○ヶ月です",
            "持病があります"
        ]
    }
]

def generate_ts():
    ts_code = "export const languages = [\n"
    for lang_id, info in lang_map.items():
        name = [l["name"] for l in [{"id": "en", "name": "英語"}, {"id": "zh", "name": "中国語"}, {"id": "ko", "name": "韓国語"}, {"id": "th", "name": "タイ語"}, {"id": "vi", "name": "ベトナム語"}, {"id": "ms", "name": "マレー・インドネシア語"}, {"id": "es", "name": "スペイン語"}, {"id": "fr", "name": "フランス語"}, {"id": "de", "name": "ドイツ語"}, {"id": "pt", "name": "ポルトガル語"}, {"id": "ar", "name": "アラビア語"}] if l["id"] == lang_id][0]
        ts_code += f'  {{\n    "id": "{lang_id}",\n    "name": "{name}",\n    "nameNative": "{info["native"]}"\n  }},\n'
    ts_code = ts_code.rstrip(',\n') + "\n];\n\n"

    ts_code += "export const phraseCategories = [\n"
    
    validators = {}
    for lang_id, info in lang_map.items():
        validators[lang_id] = GoogleTranslator(source='ja', target=info['code'])

    for c_idx, cat in enumerate(categories):
        ts_code += f'  {{\n    "id": "{cat["id"]}",\n    "icon": "{cat["icon"]}",\n    "title": "{cat["title"]}",\n    "phrases": [\n'
        for p_idx, phrase in enumerate(cat["phrases"]):
            print(f"Translating: {phrase}")
            ts_code += f'      {{\n        "ja": "{phrase}",\n        "translations": {{\n'
            for l_idx, (lang_id, info) in enumerate(lang_map.items()):
                try:
                    translated = validators[lang_id].translate(phrase)
                except Exception as e:
                    print(f"Error translating {phrase} to {lang_id}: {e}")
                    translated = phrase
                
                # We won\'t generate accurate phonetics for all languages automatically here, 
                # so we will just use the translated text for text, and an empty string or translated text for pron
                # However, for romanization, some tools are needed. We will just set pron = translated
                ts_code += f'          "{lang_id}": {{\n            "text": "{translated}",\n            "pron": "{translated}"\n          }}'
                if l_idx < len(lang_map) - 1:
                    ts_code += ',\n'
                else:
                    ts_code += '\n'
            ts_code += '        }\n      }'
            if p_idx < len(cat["phrases"]) - 1:
                ts_code += ',\n'
            else:
                ts_code += '\n'
        ts_code += '    ]\n  }'
        if c_idx < len(categories) - 1:
            ts_code += ',\n'
        else:
            ts_code += '\n'
    
    ts_code += "];\n"
    return ts_code

if __name__ == "__main__":
    print("Starting translation...")
    ts_data = generate_ts()
    with open("src/app/phrases/data.ts", "w", encoding="utf-8") as f:
        f.write(ts_data)
    print("Translation complete!")
