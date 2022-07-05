const PORT = process.env.PORT || 6969
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')


const app = express()



app.get('/', (req, res) => {
    res.json('Camera Specs API')
})

app.get('/status', (req, res) => {
    axios.get('https://www.dpreview.com/products/compare/cameras')
        .then((result) => {
            res.json(true)
        }).catch((err) => {
            res.json(false)
        });
})

app.get('/camera/:brand/:model', (req, res) => {
    const brand = req.params.brand
    const model = req.params.model

    axios.get('https://www.dpreview.com/products/compare/side-by-side?products=' + brand + "_" + model)
        .then((result) => {
            const html = result.data
            const $ = cheerio.load(html)

            var properties = $('.propertiesHeader table > tbody > tr > td > div > div').text()
            properties = properties.replace(/\s\s+/g, '|')
            const propertiesdata = properties.split('|')

            var table = $('.grid table > tbody > tr > td > div > div').text()
            table = table.replace(/\s\s+/g, '|')
            var tabledata = table.split('|')

            if ((tabledata.includes("Read review ...")) && (parseInt(tabledata[3].slice(-4))<2010)) {
                tabledata.shift()
                tabledata.shift()
                tabledata.shift()
                tabledata.shift()
                propertiesdata.shift()
                propertiesdata.shift()
                propertiesdata.shift()
            } else if (tabledata.includes("Read review ...")) {
                propertiesdata.shift()
                propertiesdata.shift()
                propertiesdata.shift()
                tabledata.shift()
                tabledata.shift()
                tabledata.shift()
                tabledata.shift()
                tabledata.shift()
            }

            var announced_date = tabledata[propertiesdata.indexOf("Announced")]
            var price = tabledata[propertiesdata.indexOf("MSRP")]
            var body_type = tabledata[propertiesdata.indexOf("Body type")]
            var body_material = tabledata[propertiesdata.indexOf("Body material")]
            var sensor_max_resolution = tabledata[propertiesdata.indexOf("Max resolution")]
            var sensor_image_ratio = tabledata[propertiesdata.indexOf("Image ratio w:h")]
            var sensor_effective_pixels = tabledata[propertiesdata.indexOf("Effective pixels")]
            var sensor_size = tabledata[propertiesdata.indexOf("Sensor size")]
            var sensor_type = tabledata[propertiesdata.indexOf("Sensor type")]
            var processor = tabledata[propertiesdata.indexOf("Processor")]
            var sensor_color_space = tabledata[propertiesdata.indexOf("Color space")]
            var sensor_color_filter_array = tabledata[propertiesdata.indexOf("Color filter array")]
            var image_iso = tabledata[propertiesdata.indexOf("ISO")]
            var image_boosted_iso_min = tabledata[propertiesdata.indexOf("Boosted ISO (minimum)")]
            var image_boosted_iso_max = tabledata[propertiesdata.indexOf("Boosted ISO (maximum)")]
            var image_white_balance_presets = tabledata[propertiesdata.indexOf("White balance presets")]
            var image_white_balance_custom = tabledata[propertiesdata.indexOf("Custom white balance")]
            var image_stabilization = tabledata[propertiesdata.indexOf("Image stabilization")]
            var image_stabilization_type = tabledata[propertiesdata.indexOf("Image stabilization notes")]
            var image_stabilization_cipa_rating = tabledata[propertiesdata.indexOf("CIPA image stabilization rating")]
            var image_uncompressed_format = tabledata[propertiesdata.indexOf("Uncompressed format")]
            var image_jpeg_quality = tabledata[propertiesdata.indexOf("JPEG quality levels")]
            var image_file_format = tabledata[propertiesdata.indexOf("File format")]
            var optics_autofocus = tabledata[propertiesdata.indexOf("Autofocus")]
            var optics_autofocus_assist_lamp = tabledata[propertiesdata.indexOf("Autofocus assist lamp")]
            var optics_manual_focus = tabledata[propertiesdata.indexOf("Manual focus")]
            var optics_focus_points = tabledata[propertiesdata.indexOf("Number of focus points")]
            var optics_lens_mount = tabledata[propertiesdata.indexOf("Lens mount")]
            var optics_focal_length_multiplier = tabledata[propertiesdata.indexOf("Focal length multiplier")]
            var screen_design = tabledata[propertiesdata.indexOf("Articulated LCD")]
            var screen_size = tabledata[propertiesdata.indexOf("Screen size")]
            var screen_dots = tabledata[propertiesdata.indexOf("Screen dots")]
            var screen_touch = tabledata[propertiesdata.indexOf("Touch screen")]
            var screen_type = tabledata[propertiesdata.indexOf("Screen type")]
            var screen_live_view = tabledata[propertiesdata.indexOf("Live view")]
            var viewfinder_type = tabledata[propertiesdata.indexOf("Viewfinder type")]
            var viewfinder_coverage = tabledata[propertiesdata.indexOf("Viewfinder coverage")]
            var viewfinder_magnification = tabledata[propertiesdata.indexOf("Viewfinder magnification")]
            var viewfinder_resolution = tabledata[propertiesdata.indexOf("Viewfinder resolution")]
            var shutter_speed_minimum = tabledata[propertiesdata.indexOf("Minimum shutter speed")]
            var shutter_speed_maximum = tabledata[propertiesdata.indexOf("Maximum shutter speed")]
            var aperture_priority = tabledata[propertiesdata.indexOf("Aperture priority")]
            var shutter_priority = tabledata[propertiesdata.indexOf("Shutter priority")]
            var manual_exposure_mode = tabledata[propertiesdata.indexOf("Manual exposure mode")]
            var subject_modes = tabledata[propertiesdata.indexOf("Subject / scene modes")]
            var exposure_modes = tabledata[propertiesdata.indexOf("Exposure modes")]
            var flash_builtin = tabledata[propertiesdata.indexOf("Built-in flash")]
            var flash_external = tabledata[propertiesdata.indexOf("External flash")]
            var flash_sync_speed = tabledata[propertiesdata.indexOf("Flash X sync speed")]
            var drive_modes = tabledata[propertiesdata.indexOf("Drive modes")]
            var continuous_drive = tabledata[propertiesdata.indexOf("Continuous drive")]
            var self_timer = tabledata[propertiesdata.indexOf("Self-timer")]
            var metering_modes = tabledata[propertiesdata.indexOf("Metering modes")]
            var exposure_compensation = tabledata[propertiesdata.indexOf("Exposure compensation")]
            var AE_bracketing = tabledata[propertiesdata.indexOf("AE Bracketing")]
            var WB_bracketing = tabledata[propertiesdata.indexOf("WB Bracketing")]
            var video_format = tabledata[propertiesdata.indexOf("Format")]
            var video_modes = tabledata[propertiesdata.indexOf("Modes")]
            var video_microphone = tabledata[propertiesdata.indexOf("Microphone")]
            var video_speaker = tabledata[propertiesdata.indexOf("Speaker")]
            var storage_type = tabledata[propertiesdata.indexOf("Storage types")]
            var connectivity_usb = tabledata[propertiesdata.indexOf("USB")]
            var connectivity_usb_charging = tabledata[propertiesdata.indexOf("USB charging")]
            var connectivity_hdmi = tabledata[propertiesdata.indexOf("HDMI")]
            var connectivity_microphone_port = tabledata[propertiesdata.indexOf("Microphone port")]
            var connectivity_audio_port = tabledata[propertiesdata.indexOf("Headphone port")]
            var connectivity_wireless = tabledata[propertiesdata.indexOf("Wireless")]
            var connectivity_wireless_spec = tabledata[propertiesdata.indexOf("Wireless notes")]
            var connectivity_remote_control = tabledata[propertiesdata.indexOf("Remote control")]
            var env_sealed = tabledata[propertiesdata.indexOf("Environmentally sealed")]
            var battery_type = tabledata[propertiesdata.indexOf("Battery")]
            var battery_model = tabledata[propertiesdata.indexOf("Battery description")]
            var battery_life = tabledata[propertiesdata.indexOf("Battery Life (CIPA)")]
            var weight = tabledata[propertiesdata.indexOf("Weight (inc. batteries)")]
            var dimensions = tabledata[propertiesdata.indexOf("Dimensions")]
            var orientation_sensor = tabledata[propertiesdata.indexOf("Orientation sensor")]
            var gps = tabledata[propertiesdata.indexOf("GPS")]



            const specs = {
                brand: brand,
                model: model,
                announced_date: announced_date,
                price: price,
                body_type: body_type,
                body_material: body_material,
                sensor_max_resolution: sensor_max_resolution,
                sensor_image_ratio: sensor_image_ratio,
                sensor_effective_pixels: sensor_effective_pixels,
                sensor_size: sensor_size,
                sensor_type: sensor_type,
                processor: processor,
                sensor_color_space: sensor_color_space,
                sensor_color_filter_array: sensor_color_filter_array,
                image_iso: image_iso,
                image_boosted_iso_min: image_boosted_iso_min,
                image_boosted_iso_max: image_boosted_iso_max,
                image_white_balance_presets: image_white_balance_presets,
                image_white_balance_custom: image_white_balance_custom,
                image_stabilization: image_stabilization,
                image_stabilization_type: image_stabilization_type,
                image_stabilization_cipa_rating: image_stabilization_cipa_rating,
                image_uncompressed_format: image_uncompressed_format,
                image_jpeg_quality: image_jpeg_quality,
                image_file_format: image_file_format,
                optics_autofocus: optics_autofocus,
                optics_autofocus_assist_lamp: optics_autofocus_assist_lamp,
                optics_manual_focus: optics_manual_focus,
                optics_focus_points: optics_focus_points,
                optics_lens_mount: optics_lens_mount,
                optics_focal_length_multiplier: optics_focal_length_multiplier,
                screen_design: screen_design,
                screen_size: screen_size,
                screen_dots: screen_dots,
                screen_touch: screen_touch,
                screen_type: screen_type,
                screen_live_view: screen_live_view,
                viewfinder_type: viewfinder_type,
                viewfinder_coverage: viewfinder_coverage,
                viewfinder_magnification: viewfinder_magnification,
                viewfinder_resolution: viewfinder_resolution,
                shutter_speed_minimum: shutter_speed_minimum,
                shutter_speed_maximum: shutter_speed_maximum,
                aperture_priority: aperture_priority,
                shutter_priority: shutter_priority,
                manual_exposure_mode: manual_exposure_mode,
                subject_modes: subject_modes,
                exposure_modes: exposure_modes,
                flash_builtin: flash_builtin,
                flash_external: flash_external,
                flash_sync_speed: flash_sync_speed,
                drive_modes: drive_modes,
                continuous_drive: continuous_drive,
                self_timer: self_timer,
                metering_modes: metering_modes,
                exposure_compensation: exposure_compensation,
                AE_bracketing: AE_bracketing,
                WB_bracketing: WB_bracketing,
                video_format: video_format,
                video_modes: video_modes,
                video_microphone: video_microphone,
                video_speaker: video_speaker,
                storage_type: storage_type,
                connectivity_usb: connectivity_usb,
                connectivity_usb_charging: connectivity_usb_charging,
                connectivity_hdmi: connectivity_hdmi,
                connectivity_microphone_port: connectivity_microphone_port,
                connectivity_audio_port: connectivity_audio_port,
                connectivity_wireless: connectivity_wireless,
                connectivity_wireless_spec: connectivity_wireless_spec,
                connectivity_remote_control: connectivity_remote_control,
                env_sealed: env_sealed,
                battery_type: battery_type,
                battery_model: battery_model,
                battery_life: battery_life,
                weight: weight,
                dimensions: dimensions,
                orientation_sensor: orientation_sensor,
                gps: gps
            }

            res.json(specs)

        }).catch((err) => {
            res.json("error")
        });
})

app.listen(PORT, () => console.log('server running on PORT ' + PORT))