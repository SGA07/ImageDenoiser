import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.css";
import background from "../black_bg.png";
import logo from "../logo.png";
import Modal from "react-bootstrap/Modal";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function home() {
  const [show, setShow] = React.useState(false);
  const handleOpen = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <nav className="navbar">
        <a href="/" className="navbar-brand navlink">
          Image Denoiser: ADNet Model
        </a>
        <div>
          <a class="navbar-brand" href="/model">
            Denoise
          </a>
          <a
            class="navbar-brand"
            onClick={handleOpen}
            style={{ cursor: "pointer" }}
          >
            About
          </a>
        </div>
      </nav>

      <div
        style={{
          backgroundImage: `url(${background})`,
          width: "100vw",
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <img src={logo} className="logo" alt="Logo" />
        <a href="/model" className="link">
          <div className="startlink">
            Get Started
            <FontAwesomeIcon
              icon="fa-solid fa-circle-chevron-right"
              style={{ paddingLeft: 5 }}
            />
          </div>
        </a>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="summary">
            Images that we see around us usually have a lot of noise in them.
            Image noise is a random variation of brightness or color information
            in images. There are various types of noises: Salt and pepper,
            speckle, gaussian and many more. Gaussian noise is the most common
            type of noise that is present in CCTV images. In this project, we
            tried to work on removing various types of noises. We started off by
            creating a dataset for the model. We took clean images from div2k
            and added randomized noise to it in python by cropping the images
            from the center to make them of appropriate trainable size. Then, we
            implemented various models including RIDNet, DnCNN, and ADNet. The
            best among these was the ADNet Model which gave a good PSNR. The
            model contains 17 Convolution2D layers with additional 17 hidden
            layers. ADNet Model has a speciality of self attention mechanism
            which helps in removing the generated noise as well as real noise.
            The real noise is not present over the entire image as in the case
            of the generated image. Real noise is when the noise is present in
            patches of the image and not everywhere. In the end we integrated
            the model with a web application where we can upload/ capture the
            image using a webcam and denoise it, so that the model can be tested
            in real time. The denoised image can be downloaded and saved in the
            system.
          </div>
          <div className="h5" style={{ marginTop: "10px" }}>
            Contributors:
          </div>
          <div className="contrib container">
            <div className="row">
              <div className="col">Krish Agrawal</div>
              <div className="col">
                <a
                  href="https://github.com/Krish2208"
                  style={{ textDecoration: "none", color: "black" }}
                  target={"_blank"}
                >
                  <FontAwesomeIcon icon={faGithub} /> GitHub Profile
                </a>
              </div>
              <div className="col">
                <a
                  href="https://www.linkedin.com/in/krish-agrawal-472784146/"
                  style={{ textDecoration: "none", color: "black" }}
                  target={"_blank"}
                >
                  <FontAwesomeIcon icon={faLinkedin} /> LinkedIn Profile
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col">Rupal Shah</div>
              <div className="col">
                <a
                  href="https://github.com/Rupal17shah"
                  style={{ textDecoration: "none", color: "black" }}
                  target={"_blank"}
                >
                  <FontAwesomeIcon icon={faGithub} /> GitHub Profile
                </a>
              </div>
              <div className="col">
                <a
                  href="https://www.linkedin.com/in/rupal-shah-a44a66227/"
                  style={{ textDecoration: "none", color: "black" }}
                  target={"_blank"}
                >
                  <FontAwesomeIcon icon={faLinkedin} /> LinkedIn Profile
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col">Khushi Sawla</div>
              <div className="col">
                <a
                  href="https://github.com/khushisawla"
                  style={{ textDecoration: "none", color: "black" }}
                  target={"_blank"}
                >
                  <FontAwesomeIcon icon={faGithub} /> GitHub Profile
                </a>
              </div>
              <div className="col">
                <a
                  href="https://www.linkedin.com/in/khushi-sawla-303458222/"
                  style={{ textDecoration: "none", color: "black" }}
                  target={"_blank"}
                >
                  <FontAwesomeIcon icon={faLinkedin} /> LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
          <div className="container" style={{ marginTop: "10px" }}>
            <a
              href="https://github.com/Krish2208/IITISoC-Image-Denoising.git"
              style={{ textDecoration: "none", color: "black" }}
              target={"_blank"}
            >
              <FontAwesomeIcon icon={faGithub} /> GitHub Repository Link
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
