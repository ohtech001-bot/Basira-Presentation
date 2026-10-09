# مشاركة عرض بصيرة عبر GitHub Pages

أُضيف ملف `.github/workflows/deploy.yml` لبناء العرض ونشره من فرع `main`. يأخذ مسار الاستضافة من GitHub Pages تلقائيًا، لذلك لا يلزم تعديل اسم المستودع داخل الكود. تبقى إعدادات التشغيل المحلي كما هي.

## خطوات النشر

1. أنشئ مستودعًا في GitHub؛ يمكن تسميته `Basira-Presentation`. إذا كنت تستخدم GitHub Free، اجعله عامًا `Public` للاستفادة من Pages.
2. ارفع محتويات مجلد المشروع إلى جذر المستودع، بحيث يظهر `package.json` مباشرة عند فتح المستودع. تضمّن `src` و`public` و`ui` و`tests` و`scripts` ومجلد `.github` وملفات الإعداد و`package-lock.json`.
3. ارفع إلى فرع `main`. يحوي `.gitignore` استثناءات `node_modules` و`dist`؛ عند الرفع اليدوي لا تختَر هذين المجلدين.
4. افتح **Settings → Pages**، ثم ضمن **Build and deployment** اختر **Source → GitHub Actions**.
5. افتح تبويب **Actions**، واختر **Publish Basira to GitHub Pages**، ثم **Run workflow** على فرع `main`. بعد تفعيل Pages ستنشر التحديثات التالية تلقائيًا عند رفعها إلى `main`.
6. بعد نجاح عمليتي `build` و`deploy`، يظهر الرابط في **Settings → Pages** وفي نتيجة النشر. أرسل هذا الرابط لأصدقائك؛ لن يحتاجوا Node.js أو ملفات المشروع.

للمستودع `Basira-Presentation` يكون شكل الرابط عادة:

```text
https://YOUR-USERNAME.github.io/Basira-Presentation/
```

استبدل `YOUR-USERNAME` باسم حسابك. لم تُنشر تعديلات هذه الجولة إلى المستودع تلقائيًا؛ ارفع الملفات لتحديث الرابط العام.

## ماذا يفعل النشر؟

يثبت الحزم باستخدام `npm ci` على Node.js 24، ثم يشغل lint واختبارات الأصول والتنقل والمشاهد. يبني نسخة الإنتاج بمسار Pages الصحيح، وينشر محتويات `dist` وحدها. ملف الشعار والصور المنشورة تأتي من `public/assets/ui`؛ تبقى الصور الأصلية في `ui` مطلوبة لاختبارات سلامة الأصول.

يولّد البناء أيضًا `dist/downloads/Basira-Offline.html`، وهو نسخة مستقلة تحتوي الصور والكود والأنماط كاملة. يستطيع الأصدقاء الضغط على «تحميل العرض» أسفل الموقع، ثم فتح الملف من الحاسوب دون إنترنت أو خادم. لا ترفع الملف المولّد يدويًا داخل `public`؛ يُنتَج تلقائيًا عند نشر النسخة الجديدة.

إذا فشل التشغيل الأول لأن Pages غير مفعّل، نفّذ الخطوة 4 ثم أعد تشغيل workflow. تأكد من ظهور `.github/workflows/deploy.yml` داخل المستودع، ومن عدم وضع المشروع داخل مجلد إضافي في جذر المستودع.

## مراجع

- [دليل Vite للنشر عبر GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [دليل GitHub لاستخدام workflows مع Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
