import Head from "next/head";

const AdoptMeta = () => {
    return (
        <Head>
            <title>Adoptions - Pals of Paws Society</title>
            <meta
                name="description"
                content="These homeless pets are available for adoption from us and from other animal shelters and rescue organizations in Northwest Mississippi. Some of them are managed by Pals of Paws Society directly, and the rest are available publicly on Petfinder and displayed here for your convenience."
            />
            <meta
                name="keywords"
                content="pet adoption, animal shelter, animal rescue"
            />

            <meta property="og:title" content="Adoptions - Pals of Paws Society" />
            <meta property="og:url" content="https://www.palsofpawssociety.org/adopt" />
            <meta
                property="og:description"
                content="These homeless pets are available for adoption from us and from other animal shelters and rescue organizations in Northwest Mississippi. Some of them are managed by Pals of Paws Society directly, and the rest are available publicly on Petfinder and displayed here for your convenience."
            />
        </Head>
    );
}

export default AdoptMeta;