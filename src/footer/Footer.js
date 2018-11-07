import React from 'react';

export const Footer = () => {
    return (<footer id="footer" data-stellar-background-ratio="0.5">
        <div className="container">
            <div className="row">
                <div className="copyright-text col-md-12 col-sm-12">
                    <div className="col-md-6 col-sm-6">
                        <p>Copyright &copy; 2018 Company Name:
                        <a rel="nofollow" href="/"> e-Bureau</a></p>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <ul className="social-icon">
                            <li><a href="/facebook/id" className="fa fa-facebook-square" attr="facebook icon">Facebook</a></li>
                            <li><a href="/twitter/id" className="fa fa-twitter">Twitter</a></li>
                            <li><a href="/instagram/id" className="fa fa-instagram">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>)
}

