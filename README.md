# Interest Accumulator

A Node.js/TypeScript service that calculates daily interest based on a 27.5% per annum rate with mathematical precision.

## Overview

This service provides an API endpoint to calculate daily interest accumulation using precise decimal arithmetic to avoid floating-point errors. It's built with TypeScript, Express, and includes comprehensive Jest unit tests.

## Features

- **Mathematical Precision**: Uses `decimal.js` library to eliminate floating-point arithmetic errors
- **Annual Interest Rate**: Fixed at 27.5% per annum
- **Daily Calculation**: Converts annual rate to daily rate (annual rate / 365)
- **Input Validation**: Validates that principal and days are positive numbers
- **Comprehensive Testing**: Jest unit tests covering normal cases, edge cases, and leap years
- **Type Safety**: Full TypeScript implementation

## Installation

```bash
npm install
```

## Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

### Testing Mode

```bash
npm run start:test
```

### Run Tests

```bash
npm test
```

## API Endpoint

### Calculate Daily Interest

**Endpoint**: `POST /api/v1/interest`

**Request Body**:

```json
{
    "principal": 1000,
    "days": 30
}
```

**Response**:

```json
{
    "success": true,
    "data": 22.6,
    "statusCode": 200
}
```

### Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| principal | number | Yes      | The principal amount (must be positive)                     |
| days      | number | Yes      | Number of days to calculate interest for (must be positive) |

### Calculation Formula

```
Daily Rate = Annual Rate / 365
Interest = Principal × Daily Rate × Days
```

With a 27.5% annual rate:

```
Daily Rate = 27.5% / 365 ≈ 0.0753424657534%
Interest = Principal × 0.000753424657534 × Days
```

## Example Calculations

| Principal | Days | Interest  |
| --------- | ---- | --------- |
| $1,000    | 30   | $22.60    |
| $1,234.56 | 45   | $41.89    |
| $10,000   | 365  | $2,750.00 |

## Test Coverage

The test suite includes:

- ✅ Normal value calculations
- ✅ Decimal precision and rounding (2 decimal places)
- ✅ Zero principal or zero days handling
- ✅ Negative input validation
- ✅ Leap year handling (366 days)

## Project Structure

```
├── src/
│   ├── controller/
│   │   └── interest.ts          # Request handler
│   ├── service/
│   │   ├── interest.ts          # Business logic & calculations
│   │   └── interest.test.ts     # Jest unit tests
│   ├── interface/
│   │   └── Interest.ts          # TypeScript interfaces
│   ├── constant/
│   │   └── constant.ts          # Annual rate constant
│   └── routes/
│       └── interest.ts          # Express route definitions
├── package.json
└── README.md
```

## Technologies Used

- **Node.js**: Runtime environment
- **TypeScript**: Type-safe JavaScript
- **Express**: Web framework
- **decimal.js**: Precise decimal arithmetic
- **Jest**: Testing framework
- **http-status-codes**: HTTP status code constants

## Error Handling

The service validates inputs and throws descriptive errors:

- **Negative Principal**: `"Principal and days must be positive numbers."`
- **Negative Days**: `"Principal and days must be positive numbers."`

## Mathematical Precision

This implementation uses the `decimal.js` library to ensure accurate calculations without floating-point errors. All results are rounded to 2 decimal places for financial precision.

### Why decimal.js?

JavaScript's native number type uses floating-point arithmetic, which can lead to precision errors:

```javascript
// Without decimal.js
0.1 + 0.2; // 0.30000000000000004 ❌

// With decimal.js
new Decimal(0.1).plus(0.2); // 0.3 ✅
```

## Scripts

| Script               | Description                             |
| -------------------- | --------------------------------------- |
| `npm run build`      | Compile TypeScript to JavaScript        |
| `npm run dev`        | Run in development mode with hot reload |
| `npm start`          | Run in production mode                  |
| `npm run start:test` | Run in test environment                 |
| `npm test`           | Execute Jest test suite                 |

## Contributing

1. Ensure all tests pass before submitting
2. Add tests for new features
3. Follow the existing code style
4. Update documentation as needed

## License

ISC

## Author

Seun Awonugba