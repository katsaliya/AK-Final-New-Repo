let currentStarRating = 0;

const allStars = document.querySelectorAll('.star');
if (allStars.length > 0) {
    allStars.forEach((star, i) => {
        star.onclick = function () {
            currentStarRating = i + 1; // Update the rating

            allStars.forEach((star, j) => {
                if (currentStarRating >= j + 1) {
                    star.innerHTML = '&#9733;'; // Filled star
                } else {
                    star.innerHTML = '&#9734;'; // Empty star
                }
            });
        };
    });
}

const handlePost = async (event) => {
    event.preventDefault();

    const postData = new FormData(event.target);
    const venueId = event.target.dataset.venueId;

    const newReviewData = {
        venueId: venueId,
        // name: postData.get("venue.name"),
        // address: postData.get("venue.address"),
        // phone: postData.get("venue.phone"),
        rating: currentStarRating,
        description: postData.get("description"),
    };

    console.log("Submitting new review data: ", newReviewData);

    try{
        const response = await fetch ('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReviewData),
        });

        if(response.ok) {
            const result = await response.json();
            const venueId = result.venueId || newReviewData.venueId;
            window.location.href = `/venue/${venueId}`;
        } else {
            console.error("Error submitting form:", response.statusText);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('review-form');

    if(form) {
        console.log("Form found, adding submit event listener.")
        form.addEventListener('submit', handlePost);
    } else {
        console.error("Form not found");
    }
})