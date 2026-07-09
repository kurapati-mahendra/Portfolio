const sections = document.querySelectorAll("div[id]");
const navLinks = document.querySelectorAll(".navbar a");

/* Highlight when clicked */

navLinks.forEach(link => {

    link.addEventListener("click", function(){

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});

/* Highlight while scrolling */

window.addEventListener("scroll", () => {

    let current = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

});

const texts = [
    "Computer Science Student",
    "Web Developer",
    "Competitive Programmer",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect(){

    let currentText = texts[textIndex];

    if(!isDeleting){

        typingElement.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;

        if(charIndex === currentText.length){
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    }else{

        typingElement.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;

        if(charIndex === 0){
            isDeleting = false;
            textIndex++;

            if(textIndex === texts.length){
                textIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

let lcSolved = 0;
let cfSolved = 0;
const gfgSolved = 121;

function updateTotal() {
    document.getElementById("totalSolved").textContent =
        lcSolved + cfSolved + gfgSolved;
}

// USERNAMES

const leetcode =
"mahendra_kurapati";

fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcode}`)
.then(res => res.json())
.then(data => {

    console.log(data);

    document.getElementById("lc-solved").textContent =
        data.totalSolved;

    lcSolved = Number(data.totalSolved);
   updateTotal();

})
.catch(err => {
    console.error(err);
    document.getElementById("lc-solved").textContent = "Unavailable";

    lcSolved = 0;
    updateTotal();
});




// ======================
// CODEFORCES QUESTIONS
// ======================

const codeforces =
"mahendra_kurapati";


// QUESTIONS SOLVED

fetch(
`https://codeforces.com/api/user.status?handle=${codeforces}`
)

.then(res=>res.json())

.then(data=>{

let solved =
new Set();

data.result.forEach(sub=>{

if(
sub.verdict==="OK"
){

solved.add(

sub.problem.contestId+
sub.problem.index

);

}

});

document
.getElementById(
"cf-solved"
)

.innerHTML =
solved.size;

cfSolved = solved.size;
updateTotal();

})

.catch(()=>{

document
.getElementById(
"cf-solved"
)

.innerHTML =
"0";

cfSolved = 0;
updateTotal();

});

async function loadStats() {

    // Fetch Leetcode
    // Fetch Codeforces
    // Update cards

    document.getElementById("lastUpdated").textContent =
        new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
}

loadStats();


const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("statusMessage");
const submitBtn = document.getElementById("submitBtn");
const toastContainer = document.getElementById("toastContainer");

function showToast(message, type = "success") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
    }, 2500);

    setTimeout(() => {
        toast.remove();
    }, 3200);
}

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Submitting...";

    statusMessage.className = "";
    statusMessage.textContent = "";

    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    try {

        await fetch(
            "https://script.google.com/macros/s/AKfycbwsiBcCy-t9SBaFDhFONZT2gDYABdEPOs51ivEfoXEyyT_2Q2QJtsuT7h9S5HoPsjp8/exec",
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        );

        statusMessage.textContent =
            "✅ Thank you! Your message has been sent successfully.";

        statusMessage.classList.add("success");
        showToast("Thank you! Your message has been sent successfully.", "success");

        form.reset();

    } catch (error) {

        statusMessage.textContent =
            "❌ Something went wrong. Please try again.";

        statusMessage.classList.add("error");
        showToast("Something went wrong. Please try again.", "error");
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = "Submit";

    setTimeout(() => {

        statusMessage.textContent = "";
        statusMessage.className = "";

    }, 4000);

});

const resumeDownloadBtn = document.getElementById("resumeDownloadBtn");

if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener("click", function (e) {
        e.preventDefault();

        showToast("Resume download started.", "success");

        const link = this;

        setTimeout(() => {
            window.location.href = link.href;
        }, 500);
    });
}

/* Mobile Menu Toggle */

const menuIcon = document.getElementById("menuIcon");
const navUl = document.querySelector(".navbar ul");

if (menuIcon && navUl) {
    menuIcon.addEventListener("click", () => {
        navUl.classList.toggle("show");
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navUl.classList.remove("show");
        });
    });
}