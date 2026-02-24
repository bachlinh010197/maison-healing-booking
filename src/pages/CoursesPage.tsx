import { useState } from 'react';

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <h1>Sound Therapy Training</h1>
        <p>Using Ancient Nepalese Methods</p>
      </div>

      <div className="courses-container">
        <div className="courses-promo">
          <div className="promo-badge">🎁 Special Offer</div>
          <p>Get <strong>20% off</strong> when you register <strong>10 days</strong> before the course starts</p>
        </div>

        <div className="courses-tabs">
          <button
            className={`course-tab ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            <span className="tab-name">Basic Course</span>
            <span className="tab-hours">20 hours</span>
          </button>
          <button
            className={`course-tab ${activeTab === 'advanced' ? 'active' : ''}`}
            onClick={() => setActiveTab('advanced')}
          >
            <span className="tab-name">Advanced Course</span>
            <span className="tab-hours">35 hours</span>
          </button>
        </div>

        {activeTab === 'basic' && (
          <div className="course-detail">
            <div className="course-header">
              <h2>Basic Course Curriculum</h2>
              <div className="course-meta">
                <span className="meta-item">⏱ Duration: 3 consecutive days</span>
                <span className="meta-item">📚 20 hours of training</span>
              </div>
            </div>

            <div className="course-curriculum">
              <div className="curriculum-section">
                <h3>1. Introduction to the history of Himalayan singing bowls</h3>
              </div>

              <div className="curriculum-section">
                <h3>2. How Himalayan singing bowls affect health</h3>
                <p className="curriculum-desc">Proper bowl striking techniques in therapy for deep and effective impact</p>
              </div>

              <div className="curriculum-section">
                <h3>3. Application & practice of singing bowls in relaxation/health therapy with 1 bowl and 2 or more bowls:</h3>
                <ul className="curriculum-list">
                  <li>Releasing blockages, enhancing vibration & balance with 1 bowl</li>
                  <li>Space and living environment cleansing technique</li>
                  <li>Deep relaxation technique: Relax (7 bowls)</li>
                  <li>Deep relaxation technique: Balance (4 bowls)</li>
                  <li>Singing bowl support for treating depression, anxiety disorders, mild autism</li>
                  <li>Bowl application in treating neck, shoulder, and back pain</li>
                  <li>Bowl therapy for puberty-related issues: irregular menstruation, menstrual pain, hormonal acne</li>
                  <li>Singing bowl therapy for stress, tension, and anxiety</li>
                  <li>Singing bowl therapy for insomnia</li>
                  <li>Bowl application for reproductive health, gynecological issues, kidney support (mild to moderate)</li>
                  <li>Singing bowl therapy for physical fears or deep-rooted fears from past lives</li>
                  <li>Singing bowl therapy for overthinking and lack of creativity</li>
                  <li>Sound Bath application in sound meditation</li>
                  <li>Self-practice application. Proper bowl care & cleaning techniques</li>
                </ul>
              </div>

              <div className="curriculum-section">
                <h3>4. Standard 7-step process in singing bowl therapy</h3>
                <p className="curriculum-desc">(Applied in clinics, wellness centers, spas, home therapy,...)</p>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="course-detail">
            <div className="course-header">
              <h2>Advanced Course Curriculum</h2>
              <p className="course-alt-name">SingingBowlCoach</p>
              <div className="course-meta">
                <span className="meta-item">⏱ Duration: 5 consecutive days</span>
                <span className="meta-item">📚 35 hours of training</span>
              </div>
            </div>

            <div className="course-curriculum">
              <div className="curriculum-section">
                <h3>1. Advanced therapy techniques</h3>
                <ul className="curriculum-list">
                  <li>Treating chronic insomnia and pathological insomnia</li>
                  <li>Singing bowl relaxation & advanced therapy for prenatal care & pregnant women</li>
                  <li>Head Therapy: migraines, headaches, vestibular disorders, eye health support, anxiety disorders</li>
                  <li>Advanced ear therapy techniques</li>
                </ul>
              </div>

              <div className="curriculum-section">
                <h3>2. Advanced therapy combined with water for chronic health conditions</h3>
                <ul className="curriculum-list">
                  <li>Colon & digestive health, detox</li>
                  <li>Depression, autism, energy for relationship connections, eliminating negative thoughts</li>
                  <li>Uterine warming, lymphatic & circulatory system support, kidney stones, prostate issues, reproductive health</li>
                  <li>Back pain from degeneration, limb numbness, varicose veins, knee joint pain,...</li>
                </ul>
              </div>

              <div className="curriculum-section">
                <h3>3. Guide to combining therapy techniques for specific health issues</h3>
              </div>

              <div className="curriculum-section">
                <h3>4. Psychological counseling therapy using the SCORE model</h3>
              </div>
            </div>

            <div className="course-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🎓</span>
                <span><strong>9% discount</strong> for students enrolling in the Master Teacher course</span>
              </div>
              <div className="benefit-item highlight">
                <span className="benefit-icon">♻️</span>
                <span><strong>Free re-enrollment</strong> in future courses</span>
              </div>
            </div>
          </div>
        )}

        <div className="courses-contact">
          <h3>Course Registration</h3>
          <p>Contact us for consultation and registration</p>
          <div className="contact-info">
            <a href="tel:0336256356" className="contact-item">
              📞 Hotline: 0336256356
            </a>
          </div>
          <p className="contact-address">📍 3A Che Lan Vien Street, Da Nang City</p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
