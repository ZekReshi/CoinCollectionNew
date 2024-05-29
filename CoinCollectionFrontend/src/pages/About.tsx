import styles from './About.module.css'

function About() {
    return (
        <article>
            <header>
                <h1 className={styles.aboutheader}>My Coin Collection</h1>
            </header>
            <p className={styles.aboutparagraph}>Welcome to <i>My Coin Collection</i>, a website about - you guessed it - my coin collection!</p>

            <section>
                <header>
                    <a href='/'><h2 className={styles.aboutsectionheader}>Home Page</h2></a>
                </header>
                <p className={styles.aboutparagraph}>
                    The home page of this website shows my coin collection, grouped by currency.
                    Every coin's value and year of minting are shown here, for pictures of the coins see their <i>details</i> page.
                </p>
            </section>

            <section>
                <header>
                    <h2 className={styles.aboutsectionheader}>Coin Details</h2>
                </header>
                <p className={styles.aboutparagraph}>
                    Here you can see a specific coin's details as well as pictures of their front side and back side.
                    If you want to see the statistics of this type of coin, you can navigate to the <i>statistics</i> page with all parameters set accordingly.
                </p>
            </section>

            <section>
                <header>
                    <a href='statistics'><h2 className={styles.aboutsectionheader}>Statistics</h2></a>
                </header>
                <p className={styles.aboutparagraph}>
                    For every coin <i>type</i>, i.e. for every currency, value and year of minting, the latest changes of value in EUR are displayed as a graph.
                </p>
            </section>

            <footer>
                <p className={styles.aboutparagraph}>
                    <i>This website is private and not intended for public hosting.</i>
                </p>
            </footer>
        </article>
    )
}

export default About