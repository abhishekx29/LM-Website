function marqueAnimation(){
    function moveMarque(direction){
        const isForward = direction > 0;

        gsap.to(".marque",{
            transform: isForward ? "translateX(-200%)" : "translateX(0%)",
            duration: 4,
            repeat: -1,
            ease: "none"
        });
        gsap.to(".marque img",{
            rotate: isForward ? 180 : 0,
            duration: 0.3
        });
    }

    let touchStartY = 0;

    window.addEventListener("wheel", function(dets){
        moveMarque(dets.deltaY);
    });

    window.addEventListener("touchstart", function(event){
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchend", function(event){
        const touchEndY = event.changedTouches[0].clientY;
        const swipeDistance = touchStartY - touchEndY;

        if(Math.abs(swipeDistance) > 10){
            moveMarque(swipeDistance);
        }
    }, { passive: true });

    moveMarque(1);
}

marqueAnimation()

function typeBannerText(){
    const bannerText = document.querySelector(".banner-content p");

    if(!bannerText){
        return;
    }

    const text = bannerText.textContent.replace(/\s+/g, " ").trim();
    let characterIndex = 0;
    let isDeleting = false;
    const childrenIndex = text.toLowerCase().indexOf("children,");
    const minimumCharacters = childrenIndex >= 0
        ? childrenIndex + "children,".length
        : 0;

    bannerText.textContent = "";

    function animateText(){
        if(!isDeleting && characterIndex < text.length){
            characterIndex += 1;
        } else if(isDeleting && characterIndex > minimumCharacters){
            characterIndex -= 1;
        } else if(!isDeleting && characterIndex >= text.length){
            isDeleting = true;
            window.setTimeout(animateText, 1600);
            return;
        } else if(isDeleting){
            isDeleting = false;
        }

        bannerText.textContent = text.slice(0, characterIndex);
        window.setTimeout(animateText, isDeleting ? 25 : 45);
    }

    animateText();
}

typeBannerText();

function initializeTeacherPhotoModal(){
    const modalImage = document.querySelector("#teacherPhotoModalImage");
    const modalTitle = document.querySelector("#teacherPhotoModalLabel");
    const photoButtons = document.querySelectorAll(".teacher-photo-button");

    if(!modalImage || !modalTitle || !photoButtons.length){
        return;
    }

    photoButtons.forEach(function(button){
        button.addEventListener("click", function(){
            modalImage.src = button.dataset.photoSrc;
            modalImage.alt = button.dataset.photoAlt;
            modalTitle.textContent = button.dataset.photoAlt;
        });
    });
}

initializeTeacherPhotoModal();
