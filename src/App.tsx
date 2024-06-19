import { useState } from 'react';
import './App.css';
import { US, IN, AU, FR, BR, MX } from 'country-flag-icons/react/3x2'

const App = () => {

  const [countries, setCountries] = useState<any>(['in'])

  const handeCountryCheck = (e: any) => {
    if (e.target.checked) {
      setCountries([...countries, e.target.id])
    } else {
      setCountries(countries.filter((country: any) => country !== e.target.id))
    }
  }

  const handleSaveFormData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: 'saveFormData' });
    });
  };

  const handleFillFormData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: 'fillForm' });
    });
  };

  const fetchRandomUserData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: 'fetchRandomUserData', countries: countries });
    });
  };

  return (

    <div className="container">
      <div className="btn-container">
        <button className='btn tooltip' onClick={handleSaveFormData} title="Save">
          <i className="fas fa-save"></i>
          <span className="tooltiptext">Start filling the form hit save to save the current form data</span>
        </button>
        <button className='btn tooltip' onClick={handleFillFormData}>
          <i className="fas fa-pen"></i>
          <span className="tooltiptext">This will fill the form with the saved values</span>
        </button>
        <button className='btn tooltip' onClick={fetchRandomUserData}>
          <i className="fa fa-random"></i>
          <span className="tooltiptext">This will fill the form with random values</span>
        </button>
      </div>

      <p style={{ width: "100%", "marginLeft": "4.5rem", "marginTop": "2rem", fontSize: "1rem" }}>Generate user data from : </p>

      <div className="checkbox-container">

        <div className="checkbox-wrapper">
          <input type="checkbox" className="check" id="us" onChange={handeCountryCheck} />
          <label htmlFor="us" className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect x="30" y="20" width="50" height="50" stroke="white" fill="none"></rect>
              <g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="white" strokeWidth="3" fill="none" className="path1"></path>
              </g>
            </svg>
            <span>
              <US title="United States" style={{ borderRadius: '8px', height: '27px', width: '27px' }} />
            </span>
          </label>
        </div>

        <div className="checkbox-wrapper">
          <input type="checkbox" className="check" id="in" onChange={handeCountryCheck} />
          <label htmlFor="in" className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect x="30" y="20" width="50" height="50" stroke="white" fill="none"></rect>
              <g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="white" strokeWidth="3" fill="none" className="path1"></path>
              </g>
            </svg>
            <span>
              <IN title="India" style={{ borderRadius: '8px', height: '27px', width: '27px' }} />
            </span>
          </label>
        </div>

        <div className="checkbox-wrapper">
          <input type="checkbox" className="check" id="au" onChange={handeCountryCheck} />
          <label htmlFor="au" className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect x="30" y="20" width="50" height="50" stroke="white" fill="none"></rect>
              <g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="white" strokeWidth="3" fill="none" className="path1"></path>
              </g>
            </svg>
            <span>
              <AU title="Australia" style={{ borderRadius: '8px', height: '27px', width: '27px' }} />
            </span>
          </label>
        </div>

        <div className="checkbox-wrapper">
          <input type="checkbox" className="check" id="fr" onChange={handeCountryCheck} />
          <label htmlFor="fr" className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect x="30" y="20" width="50" height="50" stroke="white" fill="none"></rect>
              <g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="white" strokeWidth="3" fill="none" className="path1"></path>
              </g>
            </svg>
            <span>
              <FR title="France" style={{ borderRadius: '8px', height: '27px', width: '27px' }} />
            </span>
          </label>
        </div>

        <div className="checkbox-wrapper">
          <input type="checkbox" className="check" id="mx" onChange={handeCountryCheck} />
          <label htmlFor="mx" className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect x="30" y="20" width="50" height="50" stroke="white" fill="none"></rect>
              <g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="white" strokeWidth="3" fill="none" className="path1"></path>
              </g>
            </svg>
            <span>
              <MX title="Mexico" style={{ borderRadius: '8px', height: '27px', width: '27px' }} />
            </span>
          </label>
        </div>

        <div className="checkbox-wrapper">
          <input type="checkbox" className="check" id="br" onChange={handeCountryCheck} />
          <label htmlFor="br" className="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect x="30" y="20" width="50" height="50" stroke="white" fill="none"></rect>
              <g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="white" strokeWidth="3" fill="none" className="path1"></path>
              </g>
            </svg>
            <span>
              <BR title="Brazil" style={{ borderRadius: '8px', height: '27px', width: '27px' }} />
            </span>
          </label>
        </div>

      </div>

      <div className="footer-container magicpattern">
        <p>Have any issues? connect with me</p>
        <div className="social-icons">
          <i className="fa-brands fa-twitter" onClick={() => window.open('https://twitter.com/_Satyam_gupta_', '_blank')}></i>
          <i className="fa-brands fa-github" onClick={() => window.open('https://github.com/satyamgupta1495', '_blank')}></i>
        </div>
      </div>
    </div >
  );
};

export default App;
