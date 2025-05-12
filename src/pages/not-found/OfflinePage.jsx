import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import "./offline-page.css";

const OfflinePage = ({ onRetry }) => {
  const [retrying, setRetrying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [autoRetryEnabled, setAutoRetryEnabled] = useState(false);

  useEffect(() => {
    let timer;
    if (autoRetryEnabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (autoRetryEnabled && countdown === 0) {
      handleRetry();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [autoRetryEnabled, countdown, onRetry]);

  const handleRetry = () => {
    setRetrying(true);

    // Simulate checking connection
    setTimeout(() => {
      onRetry();
      setRetrying(false);
    }, 1500);
  };

  const enableAutoRetry = () => {
    setAutoRetryEnabled(true);
    setCountdown(10);
  };

  return (
    <div className="offline-page">
      <div className="offline-container">
        <div className="offline-icon">
          <WifiOff size={80} />
        </div>

        <h1>You're Offline</h1>
        <p className="offline-message">
          It seems that you've lost your internet connection. Please check your
          network settings and try again.
        </p>

        <div className="connection-tips">
          <h2>Troubleshooting Tips:</h2>
          <ul>
            <li>Check if your Wi-Fi is turned on</li>
            <li>Check if Airplane mode is turned off</li>
            <li>Check your router or modem</li>
            <li>Try connecting to a different network</li>
          </ul>
        </div>

        <div className="retry-section">
          {!autoRetryEnabled ? (
            <>
              <button
                className={`retry-button ${retrying ? "retrying" : ""}`}
                onClick={handleRetry}
                disabled={retrying}
              >
                {retrying ? (
                  <>
                    <RefreshCw size={20} className="spin" />
                    Checking Connection...
                  </>
                ) : (
                  <>
                    <RefreshCw size={20} />
                    Retry Now
                  </>
                )}
              </button>

              <button className="auto-retry-button" onClick={enableAutoRetry}>
                Auto-retry in 10 seconds
              </button>
            </>
          ) : (
            <div className="auto-retry-countdown">
              <Wifi size={20} className="pulse" />
              <span>Retrying in {countdown} seconds...</span>
              <button
                className="cancel-auto-retry"
                onClick={() => setAutoRetryEnabled(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="offline-footer">
          <p>
            Hamro Bhojan will automatically reconnect when your internet
            connection is restored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
