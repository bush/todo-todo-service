//import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as pulumiAutomation from "@pulumi/pulumi/automation";

// Define a Pulumi program
const pulumiProgram = async () => {
    const table = new aws.dynamodb.Table("my-table", {
        attributes: [
            { name: "Id", type: "S" },
        ],
        hashKey: "Id",
        billingMode: "PAY_PER_REQUEST",
    });

    return {
        tableName: table.name,
    };
};

(async () => {
    // Create or select a stack
    const stack = await pulumiAutomation.LocalWorkspace.createOrSelectStack({
        stackName: "dev",
        projectName: "test-project",
        program: pulumiProgram,
    });

    console.log("Successfully initialized stack");

    // Set stack configuration
    await stack.setConfig("aws:region", { value: "us-west-2" });

    console.log("Successfully set config");

    // Refresh the stack
    await stack.refresh({ onOutput: console.info });

    console.log("Successfully refreshed stack");

    // Run pulumi up
    const upResult = await stack.up({ onOutput: console.info });

    console.log(`Update summary: \n${JSON.stringify(upResult.summary.resourceChanges, null, 4)}`);

    // Export the stack outputs
    const outputs = await stack.outputs();
    console.log(`Stack outputs: \n${JSON.stringify(outputs, null, 4)}`);
})();