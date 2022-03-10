export const generateHtmlEmail = (mainContentHtml: string) => {
	return `
    
    <head>
        <style>
            body {
                background-color: #dbdbdb;
            }
            .banner {
                height: 30px;
                width: 100%;

                background-color: #9c84b6;
            }
        </style>
    </head>
    <body>
        <div class="banner"></div>
        <div>
            <div>${mainContentHtml}</div>
            <div style="display: flex">
                <span
                    ><img
                        style="width: 90px; height: 75px; margin-right: 2rem"
                        src="https://firebasestorage.googleapis.com/v0/b/pals-of-paws-society.appspot.com/o/pop-logo.png?alt=media&token=0f0e9b62-d0c0-4a61-943b-a4ced0a2ab8e"
                />
                </span>
                <span>
                    <br />
                    <address>Pals of Paws Society</address>
                    <address>12 W Commerce St Unit 49</address>
                    <address>Hernando, MS 38632</address>
                </span>
            </div>
	    </div>
	    <div class="banner"></div>
    </body>
    
    `;
};

export const generateTextEmail = (mainContentText: string) => {
	return `
    ${mainContentText}
    \n\n
    Pals of Paws Society
    12 W Commerce St Unit 49
    Hernando, MS 38632

    `;
};

export const generateDynamicGreeting = () => {
	const currentTime = new Date();
	let timeOfDay = "morning";
	if (currentTime.getHours() > 13) timeOfDay = "afternoon";
	if (currentTime.getHours() > 19) timeOfDay = "evening";

	return `Good ${timeOfDay},`;
};

export const generatePersonalizedGreeting = (firstName: string) => {
	return `Hi ${firstName},`;
};
