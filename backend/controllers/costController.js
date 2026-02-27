// ===== Cost Controller =====

class CostController {
    /**
     * Estimate cost based on destination and item/service
     * Uses simple static data for demonstration; replace with
     * real API/database as needed.
     */
    static async estimateCost(req, res) {
        try {
            const { destination, item } = req.query;
            if (!destination || !item) {
                return res.status(400).json({
                    error: 'destination and item query parameters are required'
                });
            }

            // static sample data
            const data = {
                Paris: { coffee: 4, taxi: 20, meal: 15 },
                Tokyo: { coffee: 3.5, taxi: 25, meal: 12 },
                'New York': { coffee: 5, taxi: 30, meal: 20 },
                Dubai: { coffee: 3, taxi: 15, meal: 18 },
                Bangkok: { coffee: 2, taxi: 10, meal: 8 }
            };

            const destData = data[destination];
            let cost;
            if (destData && destData[item.toLowerCase()]) {
                cost = destData[item.toLowerCase()];
            } else {
                // fallback random estimate
                cost = Math.round((Math.random() * 25 + 5) * 10) / 10;
            }

            const rate = 83; // USD -> INR
            res.json({
                destination,
                item,
                estimatedCost: cost,
                estimatedCostINR: Math.round(cost * rate),
                currency: 'USD',
                currencyINR: 'INR',
                source: 'static-mock'
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to estimate cost',
                message: error.message
            });
        }
    }
}

module.exports = CostController;
