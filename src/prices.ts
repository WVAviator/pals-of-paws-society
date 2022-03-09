const PRICES = {
	"Ocean Blue S": 25,
	"Ocean Blue M": 25,
	"Ocean Blue L": 25,
	"Ocean Blue XL": 25,
	"Ocean Blue XXL": 25,
	"Teal S": 25,
	"Teal M": 25,
	"Teal L": 25,
	"Teal XL": 25,
	"Teal XXL": 25,
	"Sunset S": 25,
	"Sunset M": 25,
	"Sunset L": 25,
	"Sunset XL": 25,
	"Sunset XXL": 25,
};

export const getPrice = (item: string): number => {
	if (item in PRICES) {
		return PRICES[item as keyof typeof PRICES];
	}
	return 0;
};
