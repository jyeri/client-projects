import { Container } from '../container/container';
import '../../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
    return (
        <footer className="fixed bottom-5">
            <Container className="flex min-h-[--header-row-height] items-center justify-center">
                <div className="flex h-[--header-row-height] flex-row items-start">
                    <a
                        className="ml-5 text-black"
                        href="https://www.instagram.com/stylistsagapiik/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="icon-black"
                                size="lg"
                            />
                        </span>
                    </a>

                    <a className="ml-5 text-black" href="">
                        <FontAwesomeIcon
                            icon={faTiktok}
                            className="icon-black"
                            size="lg"
                        />
                    </a>
                </div>
            </Container>
        </footer>
    );
};
