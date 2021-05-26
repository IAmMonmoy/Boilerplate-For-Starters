import { validateOrReject } from 'class-validator';

export default class BaseObject {
    public async ValidateObject(): Promise<string[]> {
       try {
           await validateOrReject(this);
           return [];
       } catch (errors) {
            return this.getErrors(errors);
       }
    }

    private getErrors(errors: any[]): string[] {
        const Errors: string[] = [];
        for (const error of errors) {
            const constraint = error.constraints;
            Object.entries(constraint).forEach(
                ([key, value]) => Errors.push(value as string)
            );
        }
        return Errors;
    }
}
