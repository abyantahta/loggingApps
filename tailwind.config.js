import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                oxanium: ["Oxanium", ...defaultTheme.fontFamily.sans],
                adlam: ["ADLaM Display", ...defaultTheme.fontFamily.sans],
                playfair: ["Playfair", ...defaultTheme.fontFamily.sans],
                // playfair: ["Playfair Display", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                grayTheme: "#F5F5F5",
                yellowTheme: "#DEEC51",
                blackTheme: "#191315",
                BlueTheme: "#E1FEFE",
            },
            screens: {
                "xs": "30rem",
                "2xl": "100rem",
                "3xl": "120rem",
            },
            // breakpoints: {
            //     xs: "30rem",
            //     "2xl": "100rem",
            //     "3xl": "120rem",
            // },
        },
    },

    plugins: [forms],
};
