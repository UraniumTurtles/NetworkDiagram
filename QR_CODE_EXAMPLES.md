# QR Code URL Examples

This document provides example URLs that can be used to generate QR codes for direct access to specific network diagrams.

## URL Pattern

The URL pattern is: `https://your-domain.com/#/area-id/client-id/location-id`

## Valid Example URLs

### Baxter Manufacturing
- **Headquarters**: `#/wichita/baxter-manufacturing/baxter-hq`
- **Warehouse**: `#/wichita/baxter-manufacturing/baxter-warehouse`

### Prairie Health
- **Main Office**: `#/wichita/prairie-health/prairie-main`
- **Clinic**: `#/wichita/prairie-health/prairie-clinic`

### Xpress Logistics
- **Distribution Center**: `#/wichita/xpress-logistics/xpress-dc`
- **Office**: `#/wichita/xpress-logistics/xpress-office`

### Mile High Logistics
- **Denver HQ**: `#/denver/milehigh-logistics/milehigh-hq`
- **Warehouse**: `#/denver/milehigh-logistics/milehigh-warehouse`

### Heartland Credit Union
- **Main Branch**: `#/kansas-city/heartland-credit-union/heartland-main`
- **Operations Center**: `#/kansas-city/heartland-credit-union/heartland-ops`

### Riverwalk Hospitality
- **Corporate Office**: `#/san-antonio/riverwalk-hospitality/riverwalk-corporate`
- **Hotel Property**: `#/san-antonio/riverwalk-hospitality/riverwalk-hotel`

### Gulf Coast Shipping
- **Port Facility**: `#/corpus-christi/gulf-coast-shipping/gulf-port`
- **Admin Office**: `#/corpus-christi/gulf-coast-shipping/gulf-admin`

### Metroplex Retail
- **Distribution Center**: `#/dallas/metroplex-retail/metroplex-dc`
- **Store**: `#/dallas/metroplex-retail/metroplex-store`

## Partial URLs (For Navigation)

You can also link to intermediate levels:

- **Area level**: `#/wichita` (shows all clients in Wichita area)
- **Client level**: `#/wichita/baxter-manufacturing` (shows all locations for Baxter Manufacturing)

## How to Use

1. **For deployment**: Replace the hash fragment with your actual domain
   - Example: `https://your-network-diagrams.com/#/wichita/baxter-manufacturing/baxter-hq`

2. **For local testing**: Use with localhost
   - Example: `http://localhost:8080/#/wichita/baxter-manufacturing/baxter-hq`

3. **Generate QR codes**: Use any QR code generator with these URLs
   - Print and place QR codes on equipment racks
   - Include in documentation
   - Share with clients for quick access

## Error Handling

The app includes graceful fallback:
- Invalid area ID → redirects to area selection
- Invalid client ID → redirects to client selection for that area
- Invalid location ID → redirects to location selection for that client
