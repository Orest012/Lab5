import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [
        // ваші компоненти

    ],
    imports: [
        // інші модулі
        // додайте це
    ],
    providers: [HttpClient],
    bootstrap: [HttpClient]
})
export class AppModule { }
