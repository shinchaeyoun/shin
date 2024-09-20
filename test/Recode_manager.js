Recode_manager: class Recode_manager {
    constructor(quiz_num, quiz_wrap, dom, stream, sound_class, id, lms, alert, disposeAll, ableAll, result_pop_close, start_sound_stop, btn_lock, set_time) {
      this.mediaStream = stream || null;
      this.mediaRecorder = null;
      this.isBrowser = null;
      this.isState = "stop";
      this.maxRecTime = 30;
      this.isAble = false;
      this.recordeData = [];
      this.con_wrap = quiz_wrap;
      this.quiz_num = quiz_num;
      this.wrap = dom;//this.quiz_wrap.querySelectorAll(".record_wrap_con")
      this.index = this.wrap.dataset.num;
      this.recordeInterval = null;
      this.sound_class = sound_class;
      this.id = id;
      this.lms = lms;
      this.alert_message = alert;
      this.disposeAll = disposeAll;
      this.ableAll = ableAll;
      this.recorde_pop_closed = result_pop_close;
      this.start_sound_stop = start_sound_stop;
      this.setTimeFn = null;
      this.wrap.setAttribute("islistened", "false");
      this.btn_lock = btn_lock;
      this.set_time = set_time;
      this.rec = null;


      //this.canvas = document.getElementById("pop_canvas_app");//추후에 공통으로 옮겨야 합니다.
      this.canvas = this.wrap.querySelector("canvas");
      this.canvasCtx = this.canvas.getContext("2d");

      //stt 관련 변수들
      this.is_stt = this.wrap.dataset.stt == "true";
      this.processing = false;
      this.question_text = this.con_wrap.querySelector(".question_box").innerText.replace(/\n/ig, " ") || "";
      this.recorde_text = (this.wrap.querySelector(".get_recorde_text")) ? this.wrap.querySelector(".get_recorde_text").innerHTML : "";
      this.dap_text = (this.is_stt) ? this.wrap.getAttribute("dap") : "";
      this.result_pop = null;
      this.active_panel_wrap = this.wrap.querySelector(".active_panel");
      this.record_btns_wrap = this.wrap.querySelector(".record_btns");
      this.text_box = null;
      this.text_confirm_btn = null;



      if (!this.mediaStream) {
        this.wrap.setAttribute("isnotstream", "true");

      }
      if (this.mediaStream) {
        this.createAudio();
        this.draw();
      }

      //녹음 창에 녹음해야 할 텍스트를 추출 및 삽입하는 부분
      this.inner_pop = this.wrap.querySelector(".pop_innner") || null;
      this.recorde_aud_wrap = this.wrap.querySelector(".recorde_aud_wrap");
      const _text_p = document.createElement("p");
      _text_p.innerHTML = (this.recorde_text == "" || !this.recorde_text) ? this.dap_text : this.recorde_text;
      this.inner_pop.insertBefore(_text_p, this.recorde_aud_wrap);
      //console.log("_text_p : ", _text_p);

      //녹음 및 음성 진행시 타임 프로그래스 올려주는 기능
      this.bar = this.wrap.querySelector(".bar");
      this.audio = dom.querySelector("audio") || null;
      //this.sound_class.sound_load(`listen_${this.quiz_num}_${id}`, this.audio.getAttribute("src"));//추후 퀴즈 옮겨 다닐 때 제어를 위해 로드해서 걸어둠

      if (this.audio) this.audio.addEventListener("ended", e => {
        this.stop_audio();
        this.wrap.setAttribute("islistened", "true");
        console.log("ended")
      });

      this.btnSet();
      this.isBrowser = this.checkBrowser();
      if (this.isBrowser) {
        //this.requestAccess()
      } else {
        this.alert_message.show("browser");
        //console.log("녹음기능을 지원하지 않는 브라우저입니다.")
      }

      //console.log("Recode_manager-constructor : " , win);
    };

    checkBrowser() {
      var userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1) {
        return 'safari';
      } else if (userAgent.indexOf('chrome') > -1) {
        return 'chrome';
      } else if (userAgent.indexOf('firefox') > -1) {
        return 'firefox';
      } else if (userAgent.indexOf('opera') > -1) {
        return 'opera';
      } else {
        //console.log("userAgent : ", userAgent)
        return false;
      }
    };

    btnSet() {
      this.btns = {}
      this.btns.listen = this.wrap.querySelector(".listen_btn") || null;
      this.btns.recorde_start = this.wrap.querySelector(".record_btn") || null;
      this.btns.repeat_start = this.wrap.querySelector(".repeat_btn") || null;
      this.btns.repeat_stop = this.wrap.querySelector(".pause_btn") || null;
      this.btns.recorde_download = this.wrap.querySelector(".download_btn") || null;
      this.btns.result_btn = this.wrap.querySelector(".result_btn") || null;
      this.btns.bg = this.inner_pop;

      $(this.btns.bg).draggable({
        cancel: false,
        revert: false,
        revertDuration: 0,

        drag: function (e, ui) { },
        start: function (e, ui) { },
        stop: function (e, ui) { }
      });

      //addEventListener
      this.btns.recorde_start.addEventListener("click", () => {
        if (this.btn_lock.isLock()) return;
        //녹음하기
        //console.log("녹음하기 : ", this.isState)
        this.start_sound_stop();
        this.sound_class.play("click");
        if (this.isState != "stop") {

          this.stopRecorde();
          return;
        };

        this.startRecoding();
        this.rec.record();
      });


      if (this.btns.listen) {
        this.btns.listen.addEventListener("click", () => {
          if (this.btn_lock.isLock()) return;

          this.start_sound_stop();
          this.sound_class.play("click");
          if (this.isState != "stop") {
            this.stop_audio();
            return;
          }
          this.play_audio();

        });
      }
      if (this.btns.repeat_start) {
        this.btns.repeat_start.addEventListener("click", () => {
          //녹음듣기
          //console.log("p.recorde_aud : ", this.recorde_aud);
          this.sound_class.play("click");
          if (this.isState != "stop") return;
          //kbc_main.disposeAll(p.index);
          this.recPlayAudio()
        });
      }
      if (this.btns.repeat_stop) {
        this.btns.repeat_stop.addEventListener("click", () => {
          //녹음듣기 중단
          this.sound_class.play("click");
          this.recstop_audio();
        });
      }
      if (this.btns.recorde_download) {
        this.btns.recorde_download.addEventListener("click", () => {
          //console.log("녹음된 오디오 tag :", this.recorde_aud_wrap.querySelector("audio"))
          this.recorde_aud_wrap.querySelector("a").click();
          //this.recorde_aud_wrap.querySelector("#recorde_down").click();

        });
      }
      if (this.btns.result_btn) {
        this.btns.result_btn.addEventListener("click", async () => {
          //결과 창 열기
          this.sound_class.play("click");

          if (this.processing) {
            this.alert_message.show("recordeing");
            return false;
          }

          const pop = this.wrap.querySelector(".recorde_pop");
          pop.classList.remove("active");
          this.recstop_audio();
          this.stopRecorde();

          await this.set_time.out(300);

          const isrecord = this.wrap.getAttribute("isrecord") == "true";
          if (this.is_stt && isrecord) {
            this.result_pop_open();
          }
        });
      }

    };

    play_audio() {
      this.isState = "playing";
      this.btn_lock.lock();
      this.audio.play();
      this.progress = this.audio.duration - 0.2;
      this.wrap.classList.add("listen");

      this.disposeAll(this.id);
    };

    stop_audio() {
      if (!this.audio) return false;

      this.isState = "stop";
      this.btn_lock.release();
      this.progress = this.audio.currentTime = 0;
      this.audio.pause();
      this.wrap.classList.remove("listen");

      this.ableAll();
    };

    startRecoding() {

      if (!this.mediaStream) {
        this.alert_message.show("recorde_author");
        //alert("마이크 권한 승인이 필요합니다.");
        return false;
      }

      this.processing = true;
      this.recordeData.splice(0);
      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mineType: "audio/mp3 codecs=opus"
        //mimeType: "audio/webm;codecs=pcm"
      });

      this.mediaRecorder.addEventListener('dataavailable', event => {
        this.recordeData.push(event.data);
      });

      this.progress = this.maxRecTime;
      this.mediaRecorder.start();
      this.isState = "recording";
      this.wrap.classList.add('record');
      this.wrap.setAttribute('isrecord', "false");
      this.disposeAll(this.id);
      this.btns.recorde_start.setAttribute("title", "녹음 정지");

      if (this.setTimeFn) {
        clearTimeout(this.setTimeFn);
        this.setTimeFn = null;
      }
      this.setTimeFn = setTimeout(e => {
        //console.log(this)
        this.stopRecorde();
      }, this.maxRecTime * 1000);

      this.sound_class.sounds["bgm"].isPalying = false;
      this.sound_class.sounds["bgm"].pause();
    };



    async library_stop_recorde(blob) {
      const url = URL.createObjectURL(blob);

      const a_tag = document.createElement("a");
      a_tag.style.display = "none";
      a_tag.setAttribute("id", `recorde_down${this.id}`);
      a_tag.setAttribute("target", "_blank");
      a_tag.setAttribute("href", url);
      a_tag.setAttribute("download", `녹음 파일 ${this.id}`);
      this.recorde_aud_wrap.appendChild(a_tag);



      //console.log("this : ", this , this.dap_text);
      const data = {
        question_text: this.question_text,
        dap_text: this.dap_text,
        blob_data: blob
      };

      let result = null;
      if (this.is_stt) {
        result = await this.lms.stt_api(data);
        if (!result) {
          result = {
            sentenceLevel: {
              text: "네트워크 통신에 오류가 발생하여 확인이 불가능합니다.",
              proficiencyScore: {
                score: 69.20548996043311
              }
            }
          }
        }

        const stt_score = Math.round(result.sentenceLevel.proficiencyScore.score);
        let after_class = "";
        if (stt_score >= 80) after_class = "great";
        if (stt_score >= 60 && stt_score < 80) after_class = "good";
        if (stt_score < 60) after_class = "try";

        const text = (result.sentenceLevel.text == "") ? "녹음된 발음이 없습니다" : result.sentenceLevel.text;
        //<p class="score_box">${Math.round(result.sentenceLevel.proficiencyScore.score)}</p>
        if (!this.result_pop) {

          this.result_pop = document.createElement("div");
          this.result_pop.classList.add("result_pop");
          this.result_pop.innerHTML = `
                          <div class="pop_outer">
                              <button class="close" title="녹음 팝업창 닫기"></button>
                              <div class="pop_innner ${after_class}">                                            
                                  <p class="text_box">${text}</p>
                              </div>
                          </div>`;
          this.wrap.appendChild(this.result_pop);
        } else {
          this.result_pop.innerHTML = ``;
          this.result_pop.innerHTML = `
                          <div class="pop_outer">
                              <button class="close" title="녹음 팝업창 닫기"></button>
                              <div class="pop_innner ${after_class}">                                            
                                  <p class="text_box">${text}</p>
                              </div>
                          </div>`;
        }

        const result_pop_close = this.result_pop.querySelector(".close");
        //console.log("result_pop_close : ", result_pop_close);
        result_pop_close.addEventListener("click", e => {
          //console.log("result_pop_close-click");
          this.result_pop.classList.remove("active");
          this.recorde_pop_closed(this.wrap, this.id);
        });
      };
    }

    stopRecorde() {

      if (this.setTimeFn) {
        clearTimeout(this.setTimeFn)
        this.setTimeFn = null;
      }
      //console.log("stopRecorde()-call");
      this.isState = "stop";
      this.progress = 0;
      this.btns.recorde_start.classList.add('check');
      this.ableAll();

      if (!this.mediaRecorder) return false;
      if (!this.sound_class.sounds["bgm"].isPalying) this.sound_class.play("bgm");

      this.mediaRecorder.stop();
      this.mediaRecorder.addEventListener('stop', async () => {
        const blob = new Blob(this.recordeData, { type: "audio/mp3" });
        const audioURL = URL.createObjectURL(blob);
        const audioElement = new Audio(audioURL);
        //audioElement.controls = true;
        this.recordeData.splice(0);
        this.recorde_aud_wrap.innerHTML = "";
        this.recorde_aud_wrap.appendChild(audioElement);

        this.recorde_aud = this.recorde_aud_wrap.querySelector("audio");
        this.recorde_aud.currentTime = 1e101;
        this.recorde_aud.addEventListener("ended", () => {
          this.recstop_audio();
        });
        //다운로드 파일 만들기 시작
        this.rec.stop();
        this.rec.exportWAV(this.library_stop_recorde.bind(this));
        //다운로드 파일 만들기 종료

        setTimeout(e => {
          this.recorde_aud.currentTime = 0;
          //console.log("recorde_duration : ",this.recorde_aud.duration)
        }, 100)

        this.wrap.classList.remove('record');
        this.wrap.setAttribute('isrecord', "true");
        this.btns.recorde_start.setAttribute("title", "녹음하기");




        this.processing = false;
      });
    };

    recPlayAudio() {
      this.isState = "playing";
      //console.log("recorde_aud.duration : ",this.recorde_aud.duration)
      this.progress = this.recorde_aud.duration - 0.2;
      this.wrap.classList.add('recPlay');
      this.recorde_aud.play();
      this.disposeAll(this.id);
    };

    recstop_audio() {
      this.isState = "stop";
      this.progress = 0;
      if (this.recorde_aud) {
        this.recorde_aud.currentTime = 0;
        this.recorde_aud.pause();
      }

      this.wrap.classList.remove("recPlay");
      this.ableAll();
    };
    //마이크 소리를 데이터로 전환
    createAudio() {
      const p = this;
      this.recordeData.audioCtx = new (win.AudioContext || win.webkitAudioContext)();
      this.recordeData.analyser = this.recordeData.audioCtx.createAnalyser();
      this.recordeData.source = this.input = this.recordeData.audioCtx.createMediaStreamSource(this.mediaStream);
      this.recordeData.source.connect(this.recordeData.analyser);

      this.recordeData.analyser.fftSize = 2048;
      this.recordeData.bufferLength = this.recordeData.analyser.frequencyBinCount;
      this.recordeData.audioDataArray = new Uint8Array(p.recordeData.bufferLength);

      this.rec = new win.Recorder(this.input, { numChannels: 1 });


    }
    //마이크 소리 데이터를 파형으로 그리기
    draw() {
      // 파형 데이터 가져오기
      this.recordeData.analyser.getByteTimeDomainData(this.recordeData.audioDataArray);

      // 캔버스 초기화
      //this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)';
      //this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 파형 Line 그리기
      this.canvasCtx.lineWidth = 3;
      this.canvasCtx.strokeStyle = 'rgb(255, 0, 0)';
      this.canvasCtx.beginPath();
      let sliceWidth = this.canvas.width * 1.0 / this.recordeData.bufferLength;
      let x = 0;
      for (let i = 0; i < this.recordeData.bufferLength; i++) {
        const v = this.recordeData.audioDataArray[i] / 128.0;
        const y = v * this.canvas.height / 2;

        if (i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        };

        x += sliceWidth;
      }

      this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
      this.canvasCtx.stroke();
      requestAnimationFrame(() => this.draw());
    }

    result_pop_open() {
      this.result_pop.classList.add("active");
      //console.log("result_pop_open()")
    }

    set progress(np) {
      this.bar.style.transitionDuration = np + "s";
    }

    get stt() {
      return this.is_stt;
    }
  }//ok