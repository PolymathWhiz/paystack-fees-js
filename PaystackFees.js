let Joi;
try {
    Joi = require('joi');
} catch (error) {
    process.emitWarning('Please install peer dependency - joi - so that validations can run.');
}

/**
 * A class for managing Paystack fees in your application.
 *
 * Installation
 * ------------
 * ```
 * npm install --save paystack-fees
 *```
 *
 * Peer Dependency
 * ---------------
 * Install Joi to ensure errors are thrown when the functions receive an invalid parameter.
 *
 * ```
 * npm install --save joi
 * ```
 */
class PaystackFees {
    constructor() {
        this.percentage = PaystackFees.DEFAULT_PERCENTAGE;
        this.additionalCharge = PaystackFees.DEFAULT_ADDITIONAL_CHARGE;
        this.threshold = PaystackFees.DEFAULT_THRESHOLD;
        this.cap = PaystackFees.DEFAULT_CAP;
    }

    get chargeDivider() {
        return 1 - this.percentage;
    }

    get crossover() {
        return this.threshold * this.chargeDivider - this.additionalCharge;
    }

    get flatlinePlusCharge() {
        return (this.cap - this.additionalCharge) / this.percentage;
    }

    get flatline() {
        return this.flatlinePlusCharge - this.cap;
    }

    /**
     * @description set the percentage
     * @throws if percentage sent is invalid
     * @param {number} percentage - positive number less than 1
     * @returns the current PaystackFees object
     */
    withPercentage(percentage) {
        Joi && Joi.assert(
            { percentage },
            Joi.object({
                percentage: Joi.number()
                    .positive()
                    .less(1)
                    .allow(0)
                    .required(),
            }),
        );
        this.percentage = percentage;
        return this;
    }

    /**
     * @description set the additional charge which will be added if the amount is over threshold
     * @throws if additional charge sent is invalid
     * @param {number} percentage - positive number less than 1
     * @returns the current PaystackFees object
     */
    withAdditionalCharge(additionalCharge) {
        Joi && Joi.assert(
            { additionalCharge },
            Joi.object({
                additionalCharge: Joi.number()
                    .positive()
                    .integer()
                    .allow(0)
                    .required(),
            }),
        );
        this.additionalCharge = additionalCharge;
        return this;
    }

    /**
     * @description set the threshold, beyond which additional charge
     * will be added to fees.
     * @throws if threshold sent is invalid
     * @param {number} percentage - positive number less than 1
     * @returns the current PaystackFees object
     */
    withThreshold(threshold) {
        Joi && Joi.assert(
            { threshold },
            Joi.object({
                threshold: Joi.number()
                    .positive()
                    .integer()
                    .allow(0)
                    .required(),
            }),
        );
        this.threshold = threshold;
        return this;
    }

    /**
     * @description set the cap
     * @throws if cap sent is invalid
     * @param {number} percentage - positive number less than 1
     * @returns the current PaystackFees object
     */
    withCap(cap) {
        Joi && Joi.assert(
            { cap },
            Joi.object({
                cap: Joi.number()
                    .positive()
                    .integer()
                    .required(),
            }),
        );
        this.cap = cap;
        return this;
    }

    /**
     * @description calculate amount to be sent to paystack to be settled the amount provided
     * @throws if amountInKobo sent is invalid
     * @param {number} amountInKobo - The amount we want to be settled after paystack deducts fees
     * @returns amount se should send in kobo
     * @example paystackFee.addTo(10000) // add fees so we can be settled 100 naira
     */
    addTo(amountInKobo) {
        Joi && Joi.assert(
            { amountInKobo },
            Joi.object({
                amountInKobo: Joi.number()
                    .positive()
                    .integer()
                    .allow(0)
                    .required(),
            }),
        );
        if (this.percentage === 0) {
            return amountInKobo + Math.min(this.cap, this.additionalCharge);
        }

        if (amountInKobo > this.flatline) {
            return amountInKobo + this.cap;
        }

        if (amountInKobo > this.crossover) {
            return Math.ceil(
                (amountInKobo + this.additionalCharge) / this.chargeDivider,
            );
        }

        return Math.ceil(amountInKobo / this.chargeDivider) || 1;
    }

    /**
     * @description Calculates the fee for an amount in kobo
     * @throws if amountInKobo sent is invalid
     * @param {number} amountInKobo - The amount we want to send to paystack
     * @returns fees in kobo
     * @example paystackFee.calculateFor(10000) // calculate the charge for 100 naira
     */
    calculateFor(amountInKobo) {
        Joi && Joi.assert(
            { amountInKobo },
            Joi.object({
                amountInKobo: Joi.number()
                    .positive()
                    .integer()
                    .allow(0)
                    .required(),
            }),
        );
        const flat = amountInKobo > this.threshold ? this.additionalCharge : 0;
        const fees = Math.ceil(this.percentage * amountInKobo + flat);
        return Math.min(fees, this.cap);
    }
}

PaystackFees.DEFAULT_PERCENTAGE = 0.015;
PaystackFees.DEFAULT_ADDITIONAL_CHARGE = 10000;
PaystackFees.DEFAULT_THRESHOLD = 250000;
PaystackFees.DEFAULT_CAP = 200000;

module.exports = PaystackFees;
