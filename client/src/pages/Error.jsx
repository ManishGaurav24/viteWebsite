import { NavLink } from "react-router-dom";

export const Error = () => {
    return (
        <>
            <section id="error-page">
                <div className="content">
                    <h2 className="header">404</h2>
                    <h4>Sorry! Page not found</h4>
                    <p>
                        We're sorry, but it seems you've stumbled upon a page that's as elusive as a unicorn. The digital realm can be a tricky place, and it appears that the content you were seeking has taken a detour or vanished into the depths of cyberspace. Our virtual compass is doing its best to locate the missing data, but for now, you've landed on our 404 page – the digital equivalent of a lost and found. Please bear with us as we work diligently to reunite you with the information you're looking for. In the meantime, feel free to explore other corners of our site or contact our support team for assistance. We appreciate your patience and understanding as we navigate the twists and turns of the online labyrinth.
                    </p>
                    <div className="btns">
                        <NavLink to="/">return home</NavLink>
                        <NavLink to="/contact">report problem</NavLink>
                    </div>
                </div>
            </section>
        </>
    );
};