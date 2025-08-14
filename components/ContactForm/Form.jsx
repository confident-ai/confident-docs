"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.scss";
import BackedBy from "@/components/BackedBy/backedBy";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    companyName: "",
    jobTitle: "",
    teamSize: "",
    applicationType: "",
  });
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(email);

    const personalEmailDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
      "aol.com",
      "protonmail.com",
      "zoho.com",
      "yandex.com",
    ];

    const isPersonalEmail = personalEmailDomains.some(domain => 
      email.toLowerCase().includes(domain)
    );

    return isValidFormat && !isPersonalEmail;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Work email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email =
        "Please enter a different email address. This form only accepts work email addresses.";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    if (!formData.teamSize) {
      newErrors.teamSize = "Please select your team size";
    }
    if (!formData.applicationType) {
      newErrors.applicationType = "Please select your application type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Form submitted with data:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const calendlyUrl = `https://calendly.com/d/cqbp-t88-y4j/confident-ai-intro-call?embed_domain=localhost&embed_type=PopupText&utm_source=landing&a1=${formData.companyName}&a2=${formData.jobTitle}&a3=${formData.teamSize}&a4=${formData.applicationType}&name=${formData.fullName}&email=${formData.email}`;

      setCalendlyUrl(calendlyUrl);
      setShowCalendly(true);
      document.body.style.overflow = "hidden";
      setFormData({
        email: "",
        fullName: "",
        companyName: "",
        jobTitle: "",
        teamSize: "",
        applicationType: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeCalendly = () => {
    setShowCalendly(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div className={styles.contactForm}>
        <div className={styles.inner}>
          <div className={styles.formTextWrap}>
            <div className={styles.textWrap}>
              <h1 className={styles.heading}>We'd love to show you around.</h1>
              <p className={styles.paragraph}>
                Change the way you do evals. Get insight into DeepEval's LLM
                evaluation and observability.
              </p>
              <ul>
                <li>
                  <b>Meet with one of the creators of DeepEval</b> who will
                  listen and learn about your business needs
                </li>
                <li>
                  <b>Get full visibility</b> into the Confident AI platform
                </li>
                <li>
                  <b>Receive one-to-one feedback</b> on the best strategies to
                  streamline your LLM evaluation workflows
                </li>
              </ul>
              <p className={styles.paragraph}>
                The leading LLM evaluation solution trusted by over{" "}
                <b>500 customers.</b>
              </p>
              <BackedBy />
            </div>
            <div className={styles.Form}>
              <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Work email*"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? styles.error : ""}
                  />
                  {errors.email && (
                    <span className={styles.errorMessage}>{errors.email}</span>
                  )}
                </div>
                <div className={styles.input}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name*"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={errors.fullName ? styles.error : ""}
                  />
                  {errors.fullName && (
                    <span className={styles.errorMessage}>
                      {errors.fullName}
                    </span>
                  )}
                </div>
                <div className={`${styles.input} ${styles.wrapInput}`}>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company name*"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={errors.companyName ? styles.error : ""}
                  />
                  {errors.companyName && (
                    <span className={styles.errorMessage}>
                      {errors.companyName}
                    </span>
                  )}
                </div>
                <div className={`${styles.input} ${styles.wrapInput}`}>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job title*"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className={errors.jobTitle ? styles.error : ""}
                  />
                  {errors.jobTitle && (
                    <span className={styles.errorMessage}>
                      {errors.jobTitle}
                    </span>
                  )}
                </div>
                <div className={styles.input}>
                  <label htmlFor="teamSize">LLM team size*</label>
                  <select
                    name="teamSize"
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className={errors.teamSize ? styles.error : ""}
                  >
                    <option value="">Please select</option>
                    <option value="1-5">1-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11-20">11-20</option>
                    <option value="21-50">21-50</option>
                    <option value="51-100">51-100</option>
                    <option value="100+">100+</option>
                  </select>
                  {errors.teamSize && (
                    <span className={styles.errorMessage}>
                      {errors.teamSize}
                    </span>
                  )}
                </div>
                <div className={styles.input}>
                  <label htmlFor="type">
                    What type of LLM application are you building?*
                  </label>
                  <select
                    name="applicationType"
                    id="type"
                    value={formData.applicationType}
                    onChange={handleInputChange}
                    className={errors.applicationType ? styles.error : ""}
                  >
                    <option value="">Please select</option>
                    <option value="1">RAG</option>
                    <option value="2">LLM Chatbots</option>
                    <option value="3">LLM Agents</option>
                    <option value="4">Other</option>
                  </select>
                  {errors.applicationType && (
                    <span className={styles.errorMessage}>
                      {errors.applicationType}
                    </span>
                  )}
                </div>
                <div className={styles.privacyPolicy}>
                  <p>
                    Subject to{" "}
                    <a
                      href="https://www.confident-ai.com/privacy-policy"
                      target="_blank"
                    >
                      Confident AI's Privacy Policy
                    </a>
                    , you agree to allow Confident AI to contact you via the
                    email provided for scheduling and marketing purposes.
                  </p>
                </div>
                <div className={styles.btnWrap}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request a Demo"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showCalendly && calendlyUrl && (
        <div className={styles.calendlyPopup}>
          <div className={styles.closeBtn} onClick={closeCalendly}>
            <Image src="/icons/close.svg" alt="close" width={24} height={24} />
          </div>
          <div className={styles.popUpInner}>
            <div
              className="calendly-inline-widget"
              data-url={calendlyUrl}
              style={{ minWidth: "320px", height: "700px" }}
            ></div>
            <script
              type="text/javascript"
              src="https://assets.calendly.com/assets/external/widget.js"
              async
            ></script>
          </div>
        </div>
      )}
    </>
  );
}
