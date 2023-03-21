/**
 * 1. Render Songs --> OK
 * 2. Scroll top --> OK
 * 3. Play / pause / seek -->  OK
 * 4. CD rotate --> OK
 * 5. Next / prev --> OK
 * 6. Random --> OK
 * 7. Next / Repeat when ended --> OK
 * 8. Active song --> OK
 * 9. Scroll active song into view --> OK
 * 10. Play song when click --> OK
 */


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// const PLAYER_STORAGE_KEY = ""

const cd = $('.cd-thumb')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const pausing = $('.pause')
const playing = $('.play')
const repeatBtn = $('.btn-repeat')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const progress = $('#progress')
const randomBtn = $('.btn-random')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    // config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: [
        {
            name: 'Ngày Hôm Nay Em Cưới Rồi',
            singer: 'Khải Đăng',
            path: './assets/music/1.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Em Sẽ Là Cô Dâu',
            singer: 'Minh Vương M4U',
            path: './assets/music/2.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Hơn Cả Yêu',
            singer: 'Đức Phúc',
            path: './assets/music/3.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Cưới nhau đi',
            singer: 'Bùi Anh Tuấn FT Hiền Hồ',
            path: './assets/music/4.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'EM ĐỒNG Ý (I DO)',
            singer: 'Đức Phúc x 911 x Khắc Hưng',
            path: './assets/music/5.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Làm Vợ Anh Nhé',
            singer: 'Chi Dân',
            path: './assets/music/6.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Beautiful in white',
            singer: 'Shane Filan',
            path: './assets/music/7.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Vợ Tuyệt Vời Nhất',
            singer: 'Vũ Duy Khánh',
            path: './assets/music/8.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Vợ Người Ta',
            singer: 'Phan Mạnh Quỳnh',
            path: './assets/music/9.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Thu Cuối',
            singer: 'MR T X YANBI X HẰNG BINGBOONG',
            path: './assets/music/10.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Mất Trăm Năm',
            singer: 'Anh Khoa Đấy',
            path: './assets/music/11.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Lonely',
            singer: 'AKon',
            path: './assets/music/12.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Ai Chung Tình Được Mãi',
            singer: 'Đinh Tùng Huy',
            path: './assets/music/13.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Bay',
            singer: 'Thu Minh',
            path: './assets/music/14.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Anh Nhà Ở Đâu Thế',
            singer: 'Amee',
            path: './assets/music/15.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Là Anh',
            singer: 'Là Anh Việt Đây',
            path: './assets/music/16.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Nhạc lô phaiiii',
            singer: 'Cực lô phaiii',
            path: './assets/music/17.mp3',
            image: './assets/img/background.jpg',
        },
        {
            name: 'Nhạc lô phaiiii nhẹ',
            singer: 'Lô phaiii nhẹ',
            path: './assets/music/10.mp3',
            image: './assets/img/background.jpg',
        },
    ],

    // setConfig: function(key, value) {
    //     this.config[key] = value
    //     localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    // },  

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index ="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>

                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>

                <div class="option">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
             </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        //Xử lý CD quay / dừng 
        const cdThumbAnimation = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],
            {
                duration: 10000,
                iterations: Infinity
            })

        cdThumbAnimation.pause()

        // Xử lí phóng to thu nhỏ và làm mờ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.height = newCdWidth > 0 ? newCdWidth + 'px' : 0

            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lí khi click Play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Khi song được play 
        audio.onplay = function () {
            _this.isPlaying = true
            pausing.style.display = 'block'
            playing.style.display = 'none'
            cdThumbAnimation.play()
        }

        // Khi song được pause
        audio.onpause = function () {
            _this.isPlaying = false
            pausing.style.display = 'none'
            playing.style.display = 'block'
            cdThumbAnimation.pause()
        }

        // Xử lí tiến độ bài hát
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const currentTime = audio.currentTime
                const duration = audio.duration
                const progressPercent = Math.floor((currentTime / duration) * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý khi tua 
        progress.onchange = (e) => {
            const seekTime = (audio.duration / 100) * e.target.value
            audio.currentTime = seekTime
        }

        // Chuyển bài tiếp theo
        const nextNewSong = nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Quay lại bài trước đó
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Xử lí khi click random
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            // _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //Xử lí khi repeat lại một bài hát
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            // _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lý next song khi audio kết thúc
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            } else {
                if (_this.isRandom) {
                    _this.randomSong()
                } else {
                    _this.nextSong()
                }
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
            }
        }

        //Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            const optionNode = e.target.closest('.option')
            if (songNode || optionNode) {
                if (songNode) {
                    _this.currentIndex = parseInt(songNode.getAttribute('data-index'))
                    _this.loadCurrentSong()
                    _this.render()
                    _this.scrollToActiveSong()
                    audio.play()
                }

                if (optionNode) {
                    //nao nghĩ dc cái gì thì làm
                }
            }
        }
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 500)
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()

    },

    start: function () {
        //định nghĩa các thuộc tính cho object
        this.defineProperties()

        // lắng nghe/ xử lý các sự kiện DOM events 
        this.handleEvents()

        //tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        //Render playlist
        this.render();
    }
}

app.start()
