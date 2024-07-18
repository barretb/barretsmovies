import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'runtimetransform',
    standalone: true
})
export class RuntimeTransform implements PipeTransform {
    transform(text: string): string {
        return text.replace('PT', '').replace('H', ':').replace('M', '');
    }
}