MADLABS INFOTECH — PREMIUM STATIC WEBSITE v3

Files
-----
index.html  -> website structure/content
style.css   -> design, responsive layout and animations
script.js   -> interactions, scroll effects, mobile menu and AJAX enquiry form
assets/     -> MadLabs logo

CONTACT FORM
------------
The enquiry form uses FormSubmit standard HTML POST and sends submissions to:
  contact@madlabsinfotech.in
with a CC to:
  

The FormSubmit endpoint is:
  https://formsubmit.co/ajax/contact@madlabsinfotech.in

You have already activated the FormSubmit email, so the form is ready to use.

TESTING LOCALLY
---------------
The AJAX form is designed to work without navigating to the FormSubmit page.
For the most reliable browser test, use VS Code + Live Server or any local web server.
You can also test the page by opening index.html directly; if the browser blocks the
cross-origin request, use Live Server and test again.

VS CODE / LIVE SERVER
---------------------
1. Extract this ZIP.
2. Open the folder "MadLabs-Infotech-Million-Dollar-Site" in VS Code.
3. Install the "Live Server" extension if needed.
4. Right-click index.html -> Open with Live Server.
5. Scroll to the enquiry section.
6. Submit a test enquiry.
7. Check contact@madlabsinfotech.in.

IMPORTANT
---------
This is a static HTML/CSS/JS website. FormSubmit is the email backend for the enquiry form.
No PHP, Node.js or database is required for the form.

LOGO FIX
--------
The logo asset has been cleaned so its white canvas is transparent, and the header logo
is constrained to the header height. This prevents the "MADLABS INFOTECH.COM" text from
hanging over the page while scrolling.


FORM SUBMISSION
The enquiry form uses the standard FormSubmit HTML POST endpoint and target="_blank", matching the working FormSubmit example. It sends to contact@madlabsinfotech.in.

Important: open the website through a web server/Live Server when testing locally. FormSubmit documents that direct file:// browsing can cause submission errors.
