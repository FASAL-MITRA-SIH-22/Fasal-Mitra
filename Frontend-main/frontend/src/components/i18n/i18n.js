import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "EN",
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      EN: {
        translation: {
          description: {
            nav: [
              "Home",
              "Dashboard",
              "Detection",
              "Teleconsulting",
              "Your Profile",
              "Sign out",
              "Login/Signup",
            ],
            heading: [
              "YOUR CROP DOCTOR",
              "Crop disease detection made easy Sign up with us today!",
              "Join Us",
            ],
            home: [
              "Crop Losses due to diseases",
              "Indian Farmers lose upto ₹ 90,000 crores annually",
              "10 to 30 percent of crop production are lost due to diseases, pests and weeds thus, decreasing the productivity and affecting the economy of the country.",
              "Get started",
              "Aiding Indian Farmers",
              "One-Stop Solution for Crop Related Issues",
              "Detection and Reliable Solutions, Teleconsulting with Experts and a Community Forum for Farmers.",
              "Get started",
              "Problems faced by Farmers",
              "Knowing the exact crop disease is important before treating it.",
              "Not all farmers possess enough technological literacy to carry out independent research about crop diseases and their solutions; they’re often taken advantage of by traders who make them spend money on large quantities of unnecessary chemicals, pesticides and insecticides, which are detrimental to the soil and environment.",
              "Get started",
            ],
            diseaseDetection: [
              "Image",
              "Please upload a photo",
              "Upload photo of diseased sapling",
              "Upload a file",
              "or drag and drop",
              "up to 10MB",
              "Detect disease",
              "Try again",
            ],
            auth: [
              "Username",
              "Password",
              "Signup",
              "Login",
              "First Name",
              "Last Name",
              "Phone",
              "Farmer",
              "Expert",
            ],
          },
        },
      },
      ह: {
        translation: {
          description: {
            nav: [
              "होम",
              "डैशबोर्ड",
              "डिटेक्शन",
              "टेलीकॉन्सुलटिंग",
              "आपकी प्रोफाइल",
              "साइन आउट",
              "लॉगिन/साइन अप",
            ],
            heading: [
              "आपका फसल डॉक्टर",
              "फसल रोग का पता लगाना आसान हुआ आज ही हमारे साथ साइन अप करें!",
              "हमसे जुड़ें",
            ],
            home: [
              "रोगों के कारण फसल का नुकसान",
              "भारतीय किसानों को सालाना ₹90,000 करोड़ तक का नुकसान",
              "फसल उत्पादन का 10 से 30 प्रतिशत हिस्सा बीमारियों, कीटों और खरपतवारों के कारण नष्ट हो जाता है, जिससे उत्पादकता कम हो जाती है और देश की अर्थव्यवस्था प्रभावित होती है",
              "शुरू हो जाओ",
              "भारतीय किसानों की सहायता करना",
              "फसल से संबंधित मुद्दों के लिए वन-स्टॉप समाधान",
              "पता लगाने और विश्वसनीय समाधान, विशेषज्ञों के साथ टेलीकंसल्टिंग और किसानों के लिए एक सामुदायिक मंच",
              "शुरू हो जाओ",
              "किसानों की समस्या",
              "उपचार करने से पहले फसल की सही बीमारी जानना जरूरी है।",
              "सभी किसानों के पास फसल रोगों और उनके समाधान के बारे में स्वतंत्र शोध करने के लिए पर्याप्त तकनीकी साक्षरता नहीं है; उनका अक्सर व्यापारियों द्वारा फायदा उठाया जाता है जो उन्हें बड़ी मात्रा में अनावश्यक रसायनों, कीटनाशकों और कीटनाशकों पर पैसा खर्च करते हैं, जो मिट्टी और पर्यावरण के लिए हानिकारक हैं।",
              "शुरू हो जाओ",
            ],
            diseaseDetection: [
              "छवि",
              "कृपया एक फोटो अपलोड करें",
              "रोगग्रस्त पौधे की फोटो अपलोड करें",
              "एक फ़ाइल अपलोड करें",
              "या खींचें और छोड़ें",
              "10 एमबी तक",
              "रोग का पता लगाएं",
              "पुनः प्रयास करें",
            ],
            auth: [
              "यूजरनाम",
              "पासवर्ड",
              "साइन अप",
              "लॉगिन",
              "पहला नाम",
              "उपनाम",
              "फोन",
              "किसान",
              "विशेषज्ञ",
            ],
          },
        },
      },
      म: {
        translation: {
          description: {
            nav: [
              "होम",
              "डैशबोर्ड",
              "डिटेक्शन",
              "टेलीकॉन्सुलटिंग",
              "तुमचे प्रोफाइल",
              "साइन आउट",
              "लॉगिन/साइन अप",
            ],
            heading: [
              "तुमचे पीक डॉक्टर",
              "पीक रोग शोधणे सोपे झाले आजच आमच्यासोबत साइन अप करा!",
              "आमच्यात सामील व्हा",
            ],
            home: [
              "रोगांमुळे पिकांचे नुकसान",
              "भारतीय शेतकऱ्यांचे वार्षिक 90,000 कोटी रुपयांचे नुकसान",
              "रोग, कीड आणि तणांमुळे 10 ते 30 टक्के पीक उत्पादन नष्ट होते, त्यामुळे उत्पादकता कमी होते आणि देशाच्या अर्थव्यवस्थेवर परिणाम होतो.",
              "सुरु करूया",
              "भारतीय शेतकऱ्यांना मदत करणे",
              "पीक संबंधित समस्यांसाठी वन-स्टॉप सोल्युशन",
              "डिटेक्शन आणि रिलायबल सोल्युशन्स, तज्ज्ञांसोबत दूरसंचार आणि शेतकऱ्यांसाठी एक समुदाय मंच.",
              "सुरु करूया",
              "शेतकऱ्यांना भेडसावणाऱ्या समस्या",
              "उपचार करण्यापूर्वी पिकावरील नेमका रोग जाणून घेणे महत्त्वाचे आहे.",
              "सर्व शेतकऱ्यांकडे पीक रोग आणि त्यांच्या उपायांबद्दल स्वतंत्र संशोधन करण्यासाठी पुरेशी तांत्रिक साक्षरता नसते; त्यांचा फायदा अनेकदा व्यापारी घेतात जे त्यांना मोठ्या प्रमाणात अनावश्यक रसायने, कीटकनाशके आणि कीटकनाशकांवर पैसे खर्च करतात, जे माती आणि पर्यावरणास हानिकारक आहेत.",
              "सुरु करूया",
            ],
            diseaseDetection: [
              "प्रतिमा",
              "कृपया फोटो अपलोड करा",
              "रोगग्रस्त रोपट्याचा फोटो अपलोड करा",
              "फाइल अपलोड करा",
              "किंवा ड्रॅग अँड ड्रॉप",
              "10MB पर्यंत",
              "रोग ओळखा",
              "पुन्हा प्रयत्न करा",
            ],
            auth: [
              "यूजरनाम",
              "पासवर्ड",
              "साइन अप",
              "लॉगिन",
              "पहिले नाव",
              "आडनाव",
              "फोन",
              "शेतकरी",
              "तज्ञ",
            ],
          },
        },
      },
    },
  });

export default i18n;
