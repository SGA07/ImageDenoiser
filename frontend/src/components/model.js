import React from "react";
import axios from "axios";
import "./model.css";
import { useState } from "react";
import placeholder from "../placeholder.png";
import Modal from "react-bootstrap/Modal";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
const imageToBase64 = require("image-to-base64");

export default function Model() {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(placeholder);
  const [camera, setCamera] = useState(false);
  const [denoisedImage, setDenoisedImage] = useState(
    "iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEeWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIyLTA4LTEyPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjAwNWEwZGNlLWYwN2QtNDBkMC04YzJmLWEwNGEzZWFmOWE0ZDwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5VbnRpdGxlZCAoNDAwIMOXIDQwMCBweCk8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2Ny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"
  );
  const [metrics, setMetrics] = useState({ psnr: "", ssim: "" });
  const [file_obj, setFileObj] = useState(false);
  const [check, setCheck] = useState(false);
  const [denoisedImageObj, setDenoisedImageObj] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    setCamera(false);
  };
  const handleShow = () => {
    setShow(true);
    setCamera(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
    handleClose();
    setImg(dataUri);
    setCheck(true);
    setCamera(false);
  }

  function handleTakePhotoAnimationDone(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  function handleCameraError(error) {
    console.log("handleCameraError", error);
  }

  function handleCameraStart(stream) {
    console.log("handleCameraStart");
  }

  function handleCameraStop() {
    console.log("handleCameraStop");
  }
  const handleDenoise = () => {
    setLoading(true);
    if (!check) {
      getBase64(file_obj)
        .then((result) => {
          axios
            .post("http://127.0.0.1:5000/predict", {
              x: result.slice(23, result.length),
            })
            .then((res) => {
              setDenoisedImage(res.data.image);
              setMetrics({ psnr: res.data.psnr, ssim: res.data.ssim });
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      axios
        .post("http://127.0.0.1:5000/predict", {
          x: img.slice(23, img.length),
        })
        .then((res) => {
          setDenoisedImage(res.data.image);
          setMetrics({ psnr: res.data.psnr, ssim: res.data.ssim });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  // setImg();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    setFileObj(file);
    setCheck(false);
    // console.log(img);
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <div class="d-flex justify-content-center">
            <div class="spinner-border loader text-light" role="status"></div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="split left">
        <div className="left_heading">
          <h1>Upload/Image Capture</h1>
        </div>
        <center>
          <div className="container py-4">
            <div>
              <input
                type="file"
                class="file btn2"
                onChange={onImageChange}
                name="html"
              />
              <button
                class="capturebtn btn"
                onClick={handleShow}
                style={{ marginLeft: "20px" }}
              >
                Capture Photo
              </button>

              <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Capture Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="photoclick">
                    {camera ? (
                      <Camera
                        onTakePhoto={(dataUri) => {
                          handleTakePhoto(dataUri);
                        }}
                        onTakePhotoAnimationDone={(dataUri) => {
                          handleTakePhotoAnimationDone(dataUri);
                        }}
                        onCameraError={(error) => {
                          handleCameraError(error);
                        }}
                        idealFacingMode={FACING_MODES.ENVIRONMENT}
                        idealResolution={{ width: 640, height: 480 }}
                        imageType={IMAGE_TYPES.JPG}
                        imageCompression={0.97}
                        isMaxResolution={true}
                        isImageMirror={true}
                        isSilentMode={true}
                        isDisplayStartCameraError={true}
                        isFullscreen={false}
                        sizeFactor={1}
                        onCameraStart={(stream) => {
                          handleCameraStart(stream);
                        }}
                        onCameraStop={() => {
                          handleCameraStop();
                        }}
                      />
                    ) : null}
                  </div>
                </Modal.Body>
              </Modal>
              <div className="image-div">
                <img className="image" src={img} alt="" />
              </div>
              <div className="denoisebtn">
                <button
                  className="denoisebtn btn"
                  onClick={() => {
                    handleDenoise();
                  }}
                >
                  Denoise
                </button>
              </div>
            </div>
          </div>
        </center>
      </div>

      <div className="split right">
        <div className="right_heading">
          <h1>ADNet Image Denoising Model</h1>
          <br />
          <h3>Denoised Image</h3>
          <div className="image-div">
            <img
              className="image"
              src={`data:image/png;base64,${denoisedImage}`}
              alt=""
            />
          </div>
          <br />
          {metrics.psnr == "" ? (
            <></>
          ) : (
            <>
              <div className="download">
                <a
                  href={`data:image/png;base64,${denoisedImage}`}
                  download="Denoised Image"
                >
                  <button
                    type="button"
                    className="btn-dark btn btn-outline-dark btn-lg"
                  >
                    Download
                  </button>
                </a>
              </div>
              <div className="noise row">
                <div className="col">
                  <p className="psnr">PSNR: {metrics.psnr}</p>
                </div>
                <div className="col">
                  <p className="ssim">SSIM: {metrics.ssim}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
