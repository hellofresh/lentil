const Ingredient = require('./Ingredient');
const chalk = require('chalk');
const EasyTable = require('easy-table');

class LintIngredient extends Ingredient {
    formatFileReport(report) {
        let formattedMessage = chalk.underline(`${report.filePath}\n`);

        const table = new EasyTable;

        report.messages.forEach((message) => {
            table.cell('spacing', '  ');
            table.cell('line', chalk.gray(message.line));
            table.cell('divider', chalk.gray(':'));
            table.cell('column', chalk.gray(message.column));
            table.cell('type', message.severity === 'warning' ? chalk.yellow('warning') : chalk.red('error'));
            table.cell('message', message.message);
            table.cell('rule', chalk.gray(message.ruleId));
            table.newRow();
        });

        formattedMessage += `${table.print()}\n\n`;

        return formattedMessage;
    }
}

module.exports = LintIngredient;
