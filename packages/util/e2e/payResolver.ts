import { connect } from "../src/connect";
import { 
   resolvePaymentByConditions, 
   resolvePaymentByVouchedResult, 
} from "../src/funcs";
import {
    waitBlockNumber, 
    getConditionalPay,
    getConditions,
    getVouchedCondPayResult,
    getResolvePayByCondtionsRequest,
} from "../src/utils";
import { 
    blake2AsU8a 
} from '@polkadot/util-crypto';
import { u8aToHex } from "@polkadot/util";

async function main() {
    const api = await connect();

    console.log("=== ResolvePayment By Conditions when the logic is BOOLEAN_AND and all conditions are true ===")
    let conditions = await getConditions(api, 3);
    let condPay = await getConditionalPay(
        api,
        conditions,
        10,
        Date.now(),
        999999,
        10,
        0, // BooleanAnd
    );
    let truePreimgage = u8aToHex(blake2AsU8a(api.registry.createType("u64", 1).toU8a()));
    let payRequest = await getResolvePayByCondtionsRequest(
        api,
        condPay,
        [truePreimgage]
    );

    await resolvePaymentByConditions(api, 'alice', payRequest);
    await waitBlockNumber(2);

    console.log("=== ResolvePayment By Conditions when the logic is BOOLEAN_AND and some conditions are false ====")
    conditions = await getConditions(api, 1);
    condPay = await getConditionalPay(
        api,
        conditions,
        20,
        Date.now(),
        999999,
        10,
        0, // BooleanAnd
    );
    payRequest = await getResolvePayByCondtionsRequest(
        api,
        condPay,
        [truePreimgage]
    );

    await resolvePaymentByConditions(api, 'alice', payRequest);
    await waitBlockNumber(2);

    console.log("=== ResolvePayment By Conditions when the logic is BOOLEAN_OR and some conditions are true ===")
    conditions = await getConditions(api, 2);
    condPay = await getConditionalPay(
        api,
        conditions,
        30,
        Date.now(),
        999999,
        10,
        1, // BooleanOr
    );
    payRequest = await getResolvePayByCondtionsRequest(
        api,
        condPay,
        [truePreimgage]
    );

    await resolvePaymentByConditions(api, 'alice', payRequest);
    await waitBlockNumber(2);

    console.log("=== ResolvePayment By Conditions when the logic is BOOLEAN_OR and all conditions are false ===")
    conditions = await getConditions(api, 0);
    condPay = await getConditionalPay(
        api,
        conditions,
        30,
        Date.now(),
        999999,
        10,
        1, // BooleanOr
    );
    payRequest = await getResolvePayByCondtionsRequest(
        api,
        condPay,
        [truePreimgage]
    );

    await resolvePaymentByConditions(api, 'alice', payRequest);
    await waitBlockNumber(2);

    console.log("=============== Resolve Payment By Vouched Result ========================")
    conditions = await getConditions(api, 1);
    condPay = await getConditionalPay(
        api,
        conditions,
        100,
        Date.now(),
        999999,
        10,
        1, // BooleanAnd
    );
    let vouchedPayResult = await getVouchedCondPayResult(
        api,
        condPay,
        20
    );
    await resolvePaymentByVouchedResult(api, 'alice', vouchedPayResult);
    await waitBlockNumber(2);

    console.log("=== ResolvePayment By Conditions when the logic is NUMERIC_ADD  =======")
    conditions = await getConditions(api, 5);
    condPay = await getConditionalPay(
        api,
        conditions,
        50,
        Date.now(),
        999999,
        10,
        3, // NumericAdd
    );
    payRequest = await getResolvePayByCondtionsRequest(
        api,
        condPay,
        [truePreimgage]
    );

    await resolvePaymentByConditions(api, 'alice', payRequest);
    await waitBlockNumber(2);

    console.log("=== ResolvePayment By Conditions when the logic is NUMERIC_MAX  =======")
    conditions = await getConditions(api, 5);
    condPay = await getConditionalPay(
        api,
        conditions,
        30,
        Date.now(),
        999999,
        10,
        4, // NumericMax
    );
    payRequest = await getResolvePayByCondtionsRequest(
        api,
        condPay,
        [truePreimgage]
    );

    await resolvePaymentByConditions(api, 'alice', payRequest);
    await waitBlockNumber(2);

    console.log("=== ResolvePayment By Conditions when the logic is NUMERIC_MIN  =======")
    conditions = await getConditions(api, 5);
    condPay = await getConditionalPay(
        api,
        conditions,
        30,
        Date.now(),
        999999,
        10,
        5, // NumericMin
    );
    payRequest = await getResolvePayByCondtionsRequest(
        api,
        condPay,
        [truePreimgage]
    );

    await resolvePaymentByConditions(api, 'alice', payRequest);
    await waitBlockNumber(2);

    process.exit(0);
}

main();