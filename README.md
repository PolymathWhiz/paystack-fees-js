<a name="PaystackFees"></a>

## PaystackFees
A class for managing Paystack fees in your application.

Installation
------------
```
npm install --save paystack-fees
```

Peer Dependency
---------------
Install Joi to ensure errors are thrown when the functions receive an invalid parameter.

```
npm install --save joi
```

**Kind**: global class  

* [PaystackFees](#PaystackFees)
    * [.withPercentage(percentage)](#PaystackFees+withPercentage) ⇒
    * [.withAdditionalCharge(percentage)](#PaystackFees+withAdditionalCharge) ⇒
    * [.withThreshold(percentage)](#PaystackFees+withThreshold) ⇒
    * [.withCap(percentage)](#PaystackFees+withCap) ⇒
    * [.addTo(amountInKobo)](#PaystackFees+addTo) ⇒
    * [.calculateFor(amountInKobo)](#PaystackFees+calculateFor) ⇒

<a name="PaystackFees+withPercentage"></a>

### paystackFees.withPercentage(percentage) ⇒
set the percentage

**Kind**: instance method of [<code>PaystackFees</code>](#PaystackFees)  
**Returns**: the current PaystackFees object  
**Throws**:

- if percentage sent is invalid


| Param | Type | Description |
| --- | --- | --- |
| percentage | <code>number</code> | positive number less than 1 |

<a name="PaystackFees+withAdditionalCharge"></a>

### paystackFees.withAdditionalCharge(percentage) ⇒
set the additional charge which will be added if the amount is over threshold

**Kind**: instance method of [<code>PaystackFees</code>](#PaystackFees)  
**Returns**: the current PaystackFees object  
**Throws**:

- if additional charge sent is invalid


| Param | Type | Description |
| --- | --- | --- |
| percentage | <code>number</code> | positive number less than 1 |

<a name="PaystackFees+withThreshold"></a>

### paystackFees.withThreshold(percentage) ⇒
set the threshold, beyond which additional charge
will be added to fees.

**Kind**: instance method of [<code>PaystackFees</code>](#PaystackFees)  
**Returns**: the current PaystackFees object  
**Throws**:

- if threshold sent is invalid


| Param | Type | Description |
| --- | --- | --- |
| percentage | <code>number</code> | positive number less than 1 |

<a name="PaystackFees+withCap"></a>

### paystackFees.withCap(percentage) ⇒
set the cap

**Kind**: instance method of [<code>PaystackFees</code>](#PaystackFees)  
**Returns**: the current PaystackFees object  
**Throws**:

- if cap sent is invalid


| Param | Type | Description |
| --- | --- | --- |
| percentage | <code>number</code> | positive number less than 1 |

<a name="PaystackFees+addTo"></a>

### paystackFees.addTo(amountInKobo) ⇒
calculate amount to be sent to paystack to be settled the amount provided

**Kind**: instance method of [<code>PaystackFees</code>](#PaystackFees)  
**Returns**: amount se should send in kobo  
**Throws**:

- if amountInKobo sent is invalid


| Param | Type | Description |
| --- | --- | --- |
| amountInKobo | <code>number</code> | The amount we want to be settled after paystack deducts fees |

**Example**  
```js
paystackFee.addTo(10000) // add fees so we can be settled 100 naira
```
<a name="PaystackFees+calculateFor"></a>

### paystackFees.calculateFor(amountInKobo) ⇒
Calculates the fee for an amount in kobo

**Kind**: instance method of [<code>PaystackFees</code>](#PaystackFees)  
**Returns**: fees in kobo  
**Throws**:

- if amountInKobo sent is invalid


| Param | Type | Description |
| --- | --- | --- |
| amountInKobo | <code>number</code> | The amount we want to send to paystack |

**Example**  
```js
paystackFee.calculateFor(10000) // calculate the charge for 100 naira
```
