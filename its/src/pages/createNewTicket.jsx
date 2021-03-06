import React, { useState, useRef } from "react";
import { withRouter } from 'react-router-dom';

import { Input, Label } from 'reactstrap';
import { Form } from 'react-bootstrap';
import TicketService from '../Services/TicketService';
import Message from '../components/Message';


function NewTicket(props) {

  const [ticket, setTicket] = useState({
    studentID: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deviceID: "",
    specialCase: "",
    file: {},
    subject: "",
    description: "",
    internalComment: ""
  });
  const [message, setMessage] = useState(null);
  const fileInput = useRef(null);
  let timerID = useRef(null);

  const resetForm = () =>{
    setTicket({
      studentID: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      deviceID: "",
      specialCase: "",
      file: {},
      subject: "",
      description: "",
      internalComment: ""
    });
  }

  const handle = e => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
    console.log(ticket)
  }

  const handleUpload = e => {
    setTicket({...ticket, [e.target.name]: e.target.files[0]});
    console.log(ticket)
  }

  const submit = e => {
    e.preventDefault();

    const ticketForm = new FormData();

    ticketForm.set('studentID', ticket.studentID);
    ticketForm.set('firstName', ticket.firstName);
    ticketForm.set('lastName', ticket.lastName);
    ticketForm.set('email', ticket.email);
    ticketForm.set('phone', ticket.phone);
    ticketForm.set('deviceID', ticket.deviceID);
    ticketForm.set('specialCase', ticket.specialCase);
    ticketForm.set('file', ticket.file);
    ticketForm.set('subject', ticket.subject);
    ticketForm.set('description', ticket.description);
    ticketForm.set('internalComment', ticket.internalComment);



    TicketService.new(ticketForm).then(data => {
      const {message} = data;
      console.log(message)
      setMessage(message);
      resetForm();
      if (!message.msgError){
        timerID = setTimeout(() => {
          props.history.push('/AllTicket');
        }, 2000);
      }

    });

  }

  return (
    <div>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: "@media print{.form-section{display:inline!important}.form-pagebreak{display:none!important}.form-section-closed{height:auto!important}.page-section{position:initial!important}}" }} />
      <link type="text/css" rel="stylesheet" href="https://cdn01.jotfor.ms/themes/CSS/defaultV2.css?" />
      <link type="text/css" rel="stylesheet" href="https://cdn02.jotfor.ms/themes/CSS/548b1325700cc48d318b4567.css?themeRevisionID=60d3156fd82983013b471ba1" />
      <link type="text/css" rel="stylesheet" href="https://cdn03.jotfor.ms/css/styles/payment/payment_styles.css?3.3.28156" />
      <link type="text/css" rel="stylesheet" href="https://cdn01.jotfor.ms/css/styles/payment/payment_feature.css?3.3.28156" />


      <Form className="jotform-form" /* action="https://submit.jotform.com/submit/212767694504262/" method="post" */ onSubmit={submit} encType="multipart/form-data" name="form_212767694504262" id={212767694504262} acceptCharset="utf-8" autoComplete="on">
        <input type="hidden" name="formID" defaultValue={212767694504262} />
        <input type="hidden" id="JWTContainer" defaultValue />
        <input type="hidden" id="cardinalOrderNumber" defaultValue />
        <div role="main" className="form-all">
          <style dangerouslySetInnerHTML={{ __html: "\n      .form-all:before { background: none;}\n    " }} />
          <ul className="form-section page-section">
            <li id="cid_1" className="form-input-wide" data-type="control_head">
              <div className="form-header-group  header-large">
                <div className="header-text httal htvam">
                  <h1 id="header_1" className="form-header" data-component="header">
                    New IT Service Ticket
                  </h1>
                  <div id="subHeader_1" className="form-subHeader">
                    Please provide the details of the problem
                  </div>
                </div>
              </div>
            </li>
            {/*             <li className="form-line form-line-column form-col-1" data-type="control_textbox" id="id_11">
              <label className="form-label form-label-top form-label-auto" id="label_11" > Ticket Number (Auto-Generated) </label>
              <div id="cid_11" className="form-input-wide" data-layout="half">
                <input type="text" id="input_11" name="q11_ticketNumber" data-type="input-textbox" className="form-textbox" style={{width: '310px'}} size={310}  data-component="textbox" aria-labelledby="label_11" />
              </div>
            </li> */}
            <li className="form-line form-line-column form-col-2" data-type="control_textbox" id="id_15">
              <Label className="form-label form-label-top form-label-auto" id="label_15" htmlFor="studentID"> Student ID </Label>
              <div id="cid_15" className="form-input-wide" data-layout="half">
                <Input type="text" id="studentID" name="studentID" onChange={handle} required data-type="input-textbox" className="form-textbox" data-defaultvalue style={{ width: '310px' }} size={310} data-component="textbox" aria-labelledby="label_15" />
              </div>
            </li>
            <li className="form-line form-line-column form-col-3" data-type="control_fullname" id="id_3">
              <Label className="form-label form-label-top form-label-auto" id="label_3" htmlFor="first_3"> Contact Name </Label>
              <div id="cid_3" className="form-input-wide" data-layout="full">
                <div data-wrapper-react="true">
                  <span className="form-sub-label-container" style={{ verticalAlign: 'top' }} data-input-type="first">
                    <Input type="text" id="firstName" name="firstName" onChange={handle} className="form-textbox" data-defaultvalue size={10} data-component="first" aria-labelledby="label_3 sublabel_3_first" />
                    <Label className="form-sub-label" htmlFor="firstName" id="sublabel_3_first" style={{ minHeight: '13px' }} aria-hidden="false"> First Name </Label>
                  </span>
                  <span className="form-sub-label-container" style={{ verticalAlign: 'top' }} data-input-type="last">
                    <Input type="text" id="lastName" name="lastName" onChange={handle} className="form-textbox" data-defaultvalue size={15} data-component="last" aria-labelledby="label_3 sublabel_3_last" />
                    <Label className="form-sub-label" htmlFor="lastName" id="sublabel_3_last" style={{ minHeight: '13px' }} aria-hidden="false"> Last Name </Label>
                  </span>
                </div>
              </div>
            </li>
            <li className="form-line form-line-column form-col-4" data-type="control_email" id="id_5">
              <Label className="form-label form-label-top form-label-auto" id="label_5" htmlFor="email"> Primary E-mail </Label>
              <div id="cid_5" className="form-input-wide" data-layout="half">
                <span className="form-sub-label-container" style={{ verticalAlign: 'top' }}>
                  <Input type="email" id="email" name="email" onChange={handle} className="form-textbox validate[Email]" data-defaultvalue style={{ width: '310px' }} size={310} placeholder="ex: myname@example.com" data-component="email" aria-labelledby="label_5 sublabel_input_5" />
                  <Label className="form-sub-label" htmlFor="email" id="sublabel_input_5" style={{ minHeight: '13px' }} aria-hidden="false"> example@example.com </Label>
                </span>
              </div>
            </li>
            <li className="form-line form-line-column form-col-5" data-type="control_phone" id="id_9">
              <Label className="form-label form-label-top form-label-auto" id="label_9" htmlFor="phone"> Phone Number </Label>
              <div id="cid_9" className="form-input-wide" data-layout="half">
                <span className="form-sub-label-container" style={{ verticalAlign: 'top' }}>
                  <Input type="tel" id="phone" name="phone" onChange={handle} data-type="mask-number" className="mask-phone-number form-textbox validate[Fill Mask]" data-defaultvalue style={{ width: '310px' }} data-masked="true" placeholder="(000) 000-0000" data-component="phone" aria-labelledby="label_9 sublabel_9_masked" />
                  <Label className="form-sub-label" htmlFor="phone" id="sublabel_9_masked" style={{ minHeight: '13px' }} aria-hidden="false"> Please enter a valid phone number. </Label>
                </span>
              </div>
            </li>
            <li className="form-line form-line-column form-col-6" data-type="control_textbox" id="id_8">
              <Label className="form-label form-label-top form-label-auto" id="label_8" htmlFor="deviceID"> Device ID (School Devices only) </Label>
              <div id="cid_8" className="form-input-wide" data-layout="half">
                <Input type="text" id="deviceID" name="deviceID" onChange={handle} data-type="input-textbox" className="form-textbox" data-defaultvalue style={{ width: '310px' }} size={310} placeholder=" " data-component="textbox" aria-labelledby="label_8" />
              </div>
            </li>
{/*             <li className="form-line form-line-column form-col-7" data-type="control_dropdown" id="id_13">
              <Label className="form-label form-label-top form-label-auto" id="label_13" htmlFor="deviceType"> Device Type </Label>
              <div id="cid_13" className="form-input-wide" data-layout="half">
                <select onChange={handle} className="form-dropdown" id="input_13" name="deviceType" style={{ width: '310px' }} data-component="dropdown">
                  <option value> Please Select </option>
                  <option value="Issue Report"> Issue Report </option>
                  <option value="Service Request"> Service Request </option>
                  <option value></option>
                </select>
              </div>
            </li> */}
            <li className="form-line form-line-column form-col-8" data-type="control_checkbox" id="id_17">
              <Label className="form-label form-label-top form-label-auto" id="label_17" htmlFor="specialCase"> Special Case </Label>
              <div id="cid_8" className="form-input-wide" data-layout="half">
                <Input type="text" id="specialCase" name="specialCase" onChange={handle} data-type="input-textbox" className="form-textbox" data-defaultvalue style={{ width: '310px' }} size={310} placeholder=" " data-component="textbox" aria-labelledby="label_8" />
              </div>
{/*               <div id="cid_17" className="form-input-wide" data-layout="full">
                <div className="form-single-column" role="group" aria-labelledby="label_17" data-component="checkbox">
                  <span className="form-checkbox-item" style={{ clear: 'left' }}>
                    <span className="dragger-item">
                    </span>
                    <Input type="checkbox" aria-describedby="label_17" className="form-checkbox" id="input_17_0" name="specialCase"  value="Not an IT issues" />
                    <Label id="label_input_17_0" htmlFor="input_17_0"> Not an IT issues </Label>
                  </span>
                  <span className="form-checkbox-item" style={{ clear: 'left' }}>
                    <span className="dragger-item">
                    </span>
                    <Input type="checkbox" aria-describedby="label_17" className="form-checkbox" id="input_17_1" name="specialCase" onChange={handle} value="Need Accessibility Assisstance" />
                    <Label id="label_input_17_1" htmlFor="input_17_1"> Need Accessibility Assisstance </Label>
                  </span>
                  <span className="form-checkbox-item" style={{ clear: 'left' }}>
                    <span className="dragger-item">
                    </span>
                    <Input type="checkbox" aria-describedby="label_17" className="form-checkbox" id="input_17_2" name="specialCase" onChange={handle} value="Not an English speaker" />
                    <Label id="label_input_17_2" htmlFor="input_17_2"> Not an English speaker </Label>
                  </span>
                  <span className="form-checkbox-item" style={{ clear: 'left' }}>
                    <span className="dragger-item">
                    </span>
                    <Input type="checkbox" aria-describedby="label_17" className="form-checkbox" id="input_17_3" name="specialCase" onChange={handle} value="Need On-Site Service" />
                    <Label id="label_input_17_3" htmlFor="input_17_3"> Need On-Site Service </Label>
                  </span>
                </div>
              </div> */}
            </li>
            <li className="form-line" data-type="control_fileupload" id="id_7">
              <label className="form-label form-label-top form-label-auto" id="label_7" htmlFor="input_7"> Upload Screenshot or any other files that client provided </label>

              <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Control name="file" filename="file" ref={fileInput} onChange={handleUpload} type="file" size="sm" />
              </Form.Group>
              {/*        <div id="cid_7" className="form-input-wide" data-layout="full">
                <div className="jfQuestion-fields" data-wrapper-react="true">
                  <div className="jfField isFilled">
                    <div className="jfUpload-wrapper">
                      <div className="jfUpload-container">
                        <div className="jfUpload-text-container">
                          <div className="jfUpload-icon forDesktop">
                            <span className="iconSvg  dhtupload ">
                              <svg viewBox="0 0 54 47" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g stroke="none" strokewidth={1} fill="none">
                                  <g transform="translate(-1506.000000, -2713.000000)">
                                    <g transform="translate(1421.000000, 2713.000000)">
                                      <path d="M125.212886,10.1718048 C127.110227,10.3826204 128.89335,10.9096517 130.562307,11.7529143 C132.231264,12.596177 133.689384,13.676591 134.93671,14.9941889 C136.184036,16.3117868 137.167828,17.8226097 137.888114,19.5267029 C138.608401,21.2307962 138.968539,23.049054 138.968539,24.9815309 C138.968539,26.8086 138.687456,28.6356416 138.125281,30.4627107 C137.563106,32.2897797 136.746207,33.9323605 135.674561,35.3905021 C134.602915,36.8486438 133.267769,38.0520318 131.669084,39.0007022 C130.070398,39.9493727 128.217005,40.4588363 126.108848,40.5291081 L122.261482,40.5291081 C121.804714,40.5291081 121.409441,40.3622149 121.07565,40.0284235 C120.741858,39.694632 120.574965,39.2993586 120.574965,38.8425913 C120.574965,38.385824 120.741858,37.9905506 121.07565,37.6567591 C121.409441,37.3229677 121.804714,37.1560744 122.261482,37.1560744 L126.108848,37.1560744 C127.549422,37.1560744 128.858216,36.7871526 130.03527,36.0492978 C131.212324,35.3114429 132.222468,34.3627867 133.06573,33.2033006 C133.908993,32.0438144 134.558998,30.743804 135.015765,29.3032303 C135.472533,27.8626567 135.700913,26.4221046 135.700913,24.9815309 C135.700913,23.4004134 135.384694,21.9159421 134.752247,20.5280723 C134.1198,19.1402026 133.258983,17.9280307 132.169768,16.8915204 C131.080554,15.85501 129.833247,15.0293277 128.427809,14.4144487 C127.022371,13.7995697 125.529116,13.4921348 123.947999,13.4921348 L122.735815,13.4394312 L122.366889,12.2799508 C121.48849,9.46907537 120.07429,7.28189569 118.124245,5.71834621 C116.1742,4.15479672 113.53026,3.37303371 110.192346,3.37303371 C108.084189,3.37303371 106.186876,3.73317173 104.500351,4.45345857 C102.813826,5.17374541 101.36449,6.17510478 100.1523,7.45756671 C98.9401098,8.74002865 98.0090213,10.2684193 97.3590063,12.0427844 C96.7089914,13.8171496 96.3839888,15.7232459 96.3839888,17.7611306 L96.4366924,17.7611306 L96.5420997,19.3422402 L95.0136938,19.6057584 C93.1514888,19.9219819 91.5703951,20.9233413 90.2703652,22.6098666 C88.9703353,24.2963919 88.3203301,26.1937043 88.3203301,28.301861 C88.3203301,30.6911051 89.1196608,32.7640947 90.7183462,34.5208919 C92.3170316,36.277689 94.2055603,37.1560744 96.3839888,37.1560744 L101.232725,37.1560744 C101.724628,37.1560744 102.128685,37.3229677 102.444909,37.6567591 C102.761132,37.9905506 102.919242,38.385824 102.919242,38.8425913 C102.919242,39.2993586 102.761132,39.694632 102.444909,40.0284235 C102.128685,40.3622149 101.724628,40.5291081 101.232725,40.5291081 L96.3839888,40.5291081 C94.8380073,40.5291081 93.3798875,40.2041055 92.0095857,39.5540906 C90.6392839,38.9040756 89.4358959,38.0169064 88.3993855,36.8925562 C87.3628752,35.768206 86.5371929,34.4681956 85.9223139,32.992486 C85.3074349,31.5167763 85,29.9532503 85,28.301861 C85,25.5963933 85.7554115,23.1544819 87.266257,20.9760534 C88.7771026,18.7976249 90.7095505,17.3395051 93.0636587,16.6016503 C93.2042025,14.2475421 93.7224499,12.0603624 94.6184164,10.0400456 C95.514383,8.0197289 96.7089871,6.26295807 98.2022647,4.76968048 C99.6955423,3.27640288 101.452313,2.10815028 103.47263,1.26488764 C105.492947,0.421624997 107.732829,0 110.192346,0 C112.089686,0 113.82889,0.237164061 115.410007,0.711499298 C116.991124,1.18583453 118.414109,1.8621913 119.679003,2.74058989 C120.943897,3.61898847 122.033095,4.69061868 122.946629,5.95551264 C123.860164,7.22040661 124.615575,8.62582326 125.212886,10.1718048 Z M113.249157,23.611236 L119.468188,30.4627107 C119.71414,30.7086623 119.837114,30.9985295 119.837114,31.3323209 C119.837114,31.6661124 119.71414,31.9735473 119.468188,32.2546348 L119.046559,32.5181531 C118.835743,32.7641047 118.563444,32.8607271 118.229652,32.8080232 C117.895861,32.7553193 117.605994,32.6059937 117.360042,32.3600421 L113.670787,28.2491573 L113.670787,45.2197331 C113.670787,45.7116364 113.503893,46.1156936 113.170102,46.4319171 C112.83631,46.7481406 112.441037,46.90625 111.98427,46.90625 C111.492366,46.90625 111.088309,46.7481406 110.772086,46.4319171 C110.455862,46.1156936 110.297753,45.7116364 110.297753,45.2197331 L110.297753,28.2491573 L106.713904,32.2546348 C106.467953,32.5005864 106.178086,32.649912 105.844294,32.7026159 C105.510503,32.7553198 105.220636,32.6586974 104.974684,32.4127458 L104.553055,32.1492275 C104.307103,31.86814 104.184129,31.5607051 104.184129,31.2269136 C104.184129,30.8931222 104.307103,30.603255 104.553055,30.3573034 L110.666678,23.611236 L110.666678,23.5585323 L111.088308,23.1369031 C111.193715,22.9963593 111.325473,22.8997369 111.483585,22.847033 C111.641697,22.7943291 111.791022,22.7679775 111.931566,22.7679775 C112.107246,22.7679775 112.265355,22.7943291 112.405899,22.847033 C112.546443,22.8997369 112.686984,22.9963593 112.827528,23.1369031 L113.249157,23.5585323 L113.249157,23.611236 Z">
                                      </path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div className="jfUpload-button-container">
                          <div className="jfUpload-button" aria-hidden="true" tabIndex={0} style={{display: 'none'}} data-version="v2">
                            Upload a File
                            <div className="jfUpload-heading forDesktop">
                              Drag and drop files here
                            </div>
                            <div className="jfUpload-heading forMobile">
                              Choose a file
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="jfUpload-files-container">
                        <input type="file" id="input_7" name="q7_uploadScreenshot7[]" multiple className="form-upload-multiple" data-imagevalidate="yes" data-file-accept="pdf, doc, docx, xls, csv, txt, rtf, html, zip, mp3, wma, mpg, flv, avi, jpg, jpeg, png, gif" data-limit-file-size="Yes" data-file-maxsize={10240} data-file-minsize={0} data-file-limit data-component="fileupload" aria-label="Upload a File" />
                      </div>
                    </div>
                    <div data-wrapper-react="true">
                    </div>
                  </div>
                  <span style={{display: 'none'}} className="cancelText">
                    Cancel
                  </span>
                  <span style={{display: 'none'}} className="ofText">
                    of
                  </span>
                </div>
              </div> */}
            </li>
            <li className="form-line form-line-column form-col-1 jf-required" data-type="control_textbox" id="id_12">
              <label className="form-label form-label-top form-label-auto" id="label_12" htmlFor="subject">
                Subject
                <span className="form-required">
                  *
                </span>
              </label>
              <div id="cid_12" className="form-input-wide jf-required" data-layout="half">
                <Input type="text" id="subject" name="subject" onChange={handle} data-type="input-textbox" className="form-textbox validate[required]" data-defaultvalue style={{ width: '310px' }} size={310} data-component="textbox" aria-labelledby="label_12" required />
              </div>
            </li>
           {/*  <li className="form-line form-line-column form-col-2" data-type="control_dropdown" id="id_16">
              <label className="form-label form-label-top form-label-auto" id="label_16" htmlFor="input_16"> Select a category </label>
              <div id="cid_16" className="form-input-wide" data-layout="half">
                <select className="form-dropdown" id="input_16" name="q16_selectA16" style={{ width: '310px' }} data-component="dropdown">
                  <option value> Please Select </option>
                  <option value></option>
                </select>
              </div>
            </li> */}
            <li className="form-line jf-required" data-type="control_textarea" id="id_6">
              <label className="form-label form-label-top form-label-auto" id="label_6" htmlFor="description">
                Describe the Problem in Detail (Client will see this)
                <span className="form-required">
                  *
                </span>
              </label>
              <div id="cid_6" className="form-input-wide jf-required" data-layout="full">
                <textarea id="description" className="form-textarea validate[required]" name="description" onChange={handle} style={{ width: '648px', height: '163px' }} data-component="textarea" required aria-labelledby="label_6" defaultValue={""} />
              </div>
            </li>
            <li className="form-line" data-type="control_textarea" id="id_14">
              <label className="form-label form-label-top form-label-auto" id="label_14" htmlFor="internalComment"> Internal ITS Comment (Client will NOT see this) </label>
              <div id="cid_14" className="form-input-wide" data-layout="full">
                <textarea id="internalComment" className="form-textarea" name="internalComment" onChange={handle} style={{ width: '648px', height: '163px' }} data-component="textarea" aria-labelledby="label_14" defaultValue={""} />
              </div>
            </li>
            <li className="form-line" data-type="control_textarea" id="id_18">
              <label className="form-label form-label-top" id="label_18" htmlFor="input_18"> Ticket History (Display Only) </label>
              <div id="cid_18" className="form-input-wide" data-layout="full">
                <textarea id="input_18" className="form-readonly form-textarea" name="q18_ticketHistory18" style={{ width: '648px', height: '163px' }} tabIndex={-1} data-component="textarea" readOnly aria-labelledby="label_18" defaultValue={""} />
              </div>
            </li>

            {message? <Message message={message} /> : null}
            <li className="form-line" data-type="control_button" id="id_20">
              <div id="cid_20" className="form-input-wide" data-layout="full">
                <div data-align="auto" className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField">
                  <button id="input_20" type="submit" className="form-submit-button submit-button jf-form-buttons jsTest-submitField" data-component="button" data-content>
                    Submit
                  </button>
                </div>
              </div>
            </li>
            <li style={{ clear: 'both' }}>
            </li>
            <li style={{ display: 'none' }}>
              Should be Empty:
              <input type="text" name="website" />
            </li>
          </ul>
        </div>
        <input type="hidden" className="simple_spc" id="simple_spc" name="simple_spc" defaultValue={212767694504262} />
        <div className="formFooter-heightMask">
        </div>

      </Form>
    </div>
  );
}

export default withRouter(NewTicket);