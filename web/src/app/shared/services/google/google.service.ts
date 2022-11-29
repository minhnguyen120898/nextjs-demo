import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment as config } from 'src/environments/environment';
declare var  google : any;

@Injectable({
    providedIn: 'root'
})
export class GoogleService {
    placeSearch : any;
    autocomplete : any;
    componentForm = {
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name",
    };
    subject_latlong = new Subject();
    map : any;
    markers : any;
    lastOpenedInfoWindow = null;
    constructor() {
    }


    // <script
    // src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-etLO1dVwNUgQTqAoCeLVd3QbN6-8CTM&libraries=places&map_ids=6b632bb476949436"
    // defer></script>

    async setMakers(positions : any, midlocation : object) {
        let selt = this;
        await this.deleteMaker();
        positions.forEach((child_location: any) => {
            selt.addMaker(child_location);
        });


        if (midlocation) {
            this.navigateCurrent(midlocation);
        }


    }

    deleteMaker() {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers.length = 0;
            resolve(true);
        })
    }

    addMaker(data : any) {
        let selt: any = this;
        const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            `<div  style="display:block;width: 100%; height: 7rem; background-image: url('${data.image}'); background-size:cover;background-position:center"></div>` +
            "</div>" +
            `<h1 id="firstHeading" class="firstHeading">${data.store_name}</h1>` +
            '<div id="bodyContent">' +
            `<p>${data.descriptions_text}</p>` +
            `<p><a href="${config.host}/store/${data.id}/fee" target="_black"` +
            'style="display: block;height: 3rem; width: 100%; line-height: 3rem; font-size: 1.3rem; text-align:center;border-radius: .5rem;background-color: #fb8595;color:white;text-decoration:unset"' +
            '>詳細を見る</a>' +

            "</div>" +
            "</div>";
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });

        let marker = new google.maps.Marker({
            position: data,
            map: this.map,
            label: data['store_name']
        });
        marker.addListener("click", () => {
            if (selt.lastOpenedInfoWindow) {
                selt.lastOpenedInfoWindow.close();
            }
            infowindow.open(this.map, marker);
            selt.lastOpenedInfoWindow = infowindow;
        });
        this.markers.push(marker);
    }

    initMapSearch(elementHtml : any) {
        let selt = this;
        const JAPAN_LOCATION = {
            lat: 32.6764426,
            lng: 129.4283887
        }
        this.map = new google.maps.Map(
            document.getElementById(elementHtml) as HTMLElement,
            {
                zoom: 5,
                mapId: '6b632bb476949436',
                center: JAPAN_LOCATION,
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_RIGHT,
                }
            }
        );
        this.map.addListener("dragend", (res : any) => {
            const Newlat = {
                lat: selt.map.getCenter().lat(),
                lng: selt.map.getCenter().lng()
            };
            selt.subject_latlong.next(Newlat);
        });
    }

    initMapInfo(uluru : object) {
        // The map, centered at Uluru
        const map = new google.maps.Map(document.getElementById("map-view"), {
            zoom: 10,
            center: uluru,
            mapId: '6b632bb476949436',
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            fullscreenControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_RIGHT,
            }
        });

        // The marker, positioned at Uluru
        const marker = new google.maps.Marker({
            position: uluru,
            map: map,
        });
    }

    navigateCurrent(uluru : any) {
        this.map.setZoom(10);
        this.map.setCenter(new google.maps.LatLng(uluru.lat, uluru.lng));
    }

    initAutocomplete() {
        const JAPAN_LOCATION = {
            lat: 32.6764426,
            lng: 129.4283887
        }
        let defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(JAPAN_LOCATION.lat, JAPAN_LOCATION.lng))
        let input = document.getElementById('autocomplete');
        let options = {
            bounds: defaultBounds,
            types: ['geocode']
        };
        this.autocomplete = new google.maps.places.Autocomplete(input, options);
    }


    getZoom() {
        return this.map.zoom;
    }

    getBound() {
        return {
            wa: this.map.getBounds().Wa,
            ra: this.map.getBounds().Ra
        };
    }

    getLocation(callback: any) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                if (callback) {
                    return callback({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                }
            });
        }
    }

    geolocate(callback: any) {
        if (callback && this.autocomplete) {
            if (this.autocomplete.getPlace()) {
                return callback({
                    lat: this.autocomplete.getPlace().geometry.location.lat(),
                    lng: this.autocomplete.getPlace().geometry.location.lng()
                });
            } else {
                return callback(null);
            }
        }
    }

    clearMap(){
        this.map = null;
    }
}
