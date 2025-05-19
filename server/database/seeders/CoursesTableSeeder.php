<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $course1 = new Course();
        $course1->name = 'JavaScript für Anfänger';
        $course1->code = 'JAS101';
        $course1->description = 'Für alle, die noch keine Erfahrung mit JavaScript haben.';
        $course1->save();

        $course2 = new Course();
        $course2->name = 'Fortgeschrittenes JavaScript';
        $course2->code = 'JAS201';
        $course2->description = 'Für alle, die bereits Grundkenntnisse in JavaScript haben und tiefer einsteigen möchten.';
        $course2->save();

        $course3 = new Course();
        $course3->name = 'Einführung in PHP';
        $course3->code = 'PHP101';
        $course3->description = 'Grundlagen der serverseitigen Webentwicklung mit PHP.';
        $course3->save();

        $course4 = new Course();
        $course4->name = 'Laravel Basics';
        $course4->code = 'LAR101';
        $course4->description = 'Einsteigerkurs für das Laravel Framework – MVC, Routen, Controller, Views.';
        $course4->save();

        $course5 = new Course();
        $course5->name = 'Laravel Fortgeschritten';
        $course5->code = 'LAR201';
        $course5->description = 'Tiefe Einblicke in Eloquent, Middleware, Events und Testing mit Laravel.';
        $course5->save();

        $course6 = new Course();
        $course6->name = 'Vue.js Grundlagen';
        $course6->code = 'VUE101';
        $course6->description = 'Frontend-Entwicklung mit Vue.js – Komponenten, Datenbindung, Direktiven.';
        $course6->save();

        $course7 = new Course();
        $course7->name = 'Vue.js mit Laravel kombinieren';
        $course7->code = 'VUE201';
        $course7->description = 'So verbinden Sie Laravel als Backend mit Vue.js im Frontend.';
        $course7->save();

        $course8 = new Course();
        $course8->name = 'React.js Einführung';
        $course8->code = 'REA101';
        $course8->description = 'Grundlagen von React.js – Komponenten, Props, State und JSX.';
        $course8->save();

        $course9 = new Course();
        $course9->name = 'Node.js für Backend-Einsteiger';
        $course9->code = 'NOD101';
        $course9->description = 'Serverseitige Entwicklung mit Node.js und Express.';
        $course9->save();

        $course10 = new Course();
        $course10->name = 'HTML & CSS Basics';
        $course10->code = 'HTM101';
        $course10->description = 'Für alle, die Webseiten mit HTML & CSS gestalten möchten.';
        $course10->save();

        $course11 = new Course();
        $course11->name = 'Moderne CSS-Techniken';
        $course11->code = 'CSS101';
        $course11->description = 'Flexbox, Grid, Media Queries – modernes CSS effektiv nutzen.';
        $course11->save();

        $course12 = new Course();
        $course12->name = 'SQL-Grundlagen';
        $course12->code = 'SQL101';
        $course12->description = 'Basiswissen zu relationalen Datenbanken und SQL-Abfragen.';
        $course12->save();

        $course13 = new Course();
        $course13->name = 'Lernpsychologie kompakt';
        $course13->code = 'LPS101';
        $course13->description = 'Wie Lernen funktioniert – kognitive, behaviorale und konstruktivistische Ansätze.';
        $course13->save();

        $course14 = new Course();
        $course14->name = 'Organisationsentwicklung verstehen';
        $course14->code = 'ORG101';
        $course14->description = 'Grundlagen und Konzepte der Organisationsentwicklung für Studium oder Beruf.';
        $course14->save();

        $course15 = new Course();
        $course15->name = 'Personalentwicklung in der Praxis';
        $course15->code = 'PER101';
        $course15->description = 'Wie Unternehmen ihre Mitarbeitenden gezielt fördern und weiterentwickeln.';
        $course15->save();
    }
}
