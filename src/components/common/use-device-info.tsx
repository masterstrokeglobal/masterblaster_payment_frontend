import { useState, useEffect } from 'react';

interface UserDeviceInfo {
  userAgent: string;
  platform: string;
  ip: string | null;
  connection?: {
    effectiveType?: string;
    downlink?: number;
  };
  location: {
    latitude: number | null;
    longitude: number | null;
    permissionGranted: boolean;
  };
  isLoading: boolean;
  error: string | null;
}

/**
 * React hook to get device information and location
 * @returns Device information using navigator properties
 */
export const useDeviceInfo = (): UserDeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<UserDeviceInfo>({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    ip: null,
    location: {
      latitude: null,
      longitude: null,
      permissionGranted: false
    },
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;
    
    const collectInfo = async () => {
      try {
        // Get connection information if available
        let connectionInfo = undefined;
        if ('connection' in navigator) {
          const conn = (navigator as any).connection;
          connectionInfo = {
            effectiveType: conn?.effectiveType,
            downlink: conn?.downlink
          };
        }
        
        // Try to get IP using a public API
        let ipAddress = null;
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip;
        } catch (ipError) {
          console.warn("Failed to fetch IP address:", ipError);
        }
        
        // Try to get location if available
        let locationData = {
          latitude: null as number | null,
          longitude: null as number | null,
          permissionGranted: false
        };
        
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 10000,
              maximumAge: 60000
            });
          });
          
          locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            permissionGranted: true
          };
        } catch (locationError) {
          console.warn("Location access denied or unavailable");
        }
        
        // Update state if component is still mounted
        if (isMounted) {
          setDeviceInfo({
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            ip: ipAddress,
            connection: connectionInfo,
            location: locationData,
            isLoading: false,
            error: null
          });
        }
      } catch (error) {
        if (isMounted) {
          setDeviceInfo(prevInfo => ({
            ...prevInfo,
            isLoading: false,
            error: error instanceof Error ? error.message : "Failed to fetch device information"
          }));
        }
      }
    };

    collectInfo();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return deviceInfo;
};
