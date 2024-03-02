package com.skyside.chatroom.vo;

import com.google.gson.annotations.SerializedName;

public class Preferences {
    @SerializedName("id")
    private int id;
    @SerializedName("user-id")
    private int userid;
    @SerializedName("is-dark-mode")
    private boolean darkMode;
    @SerializedName("profile-page-background-image")
    private String profilePageBackgroundImage;
    @SerializedName("global-chat-background-image")
    private String globalChatBackgroundImage;
    @SerializedName("is-press-enter-to-send")
    private boolean pressEnterToSend;
    @SerializedName("application-language")
    private String applicationLanguage;
    @SerializedName("allow-hide-scroll-control")
    private boolean allowHideScrollControl;
    @SerializedName("allow-hide-page-header")
    private boolean allowHidePageHeader;
    @SerializedName("allow-hide-message-input")
    private boolean allowHideMessageInput;
    @SerializedName("is-modal-fade-enabled")
    private boolean modalFade;
    @SerializedName("is-assistive-links-enabled")
    private boolean assistiveLinks;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public boolean isDarkMode() {
        return darkMode;
    }

    public void setDarkMode(boolean darkMode) {
        this.darkMode = darkMode;
    }

    public String getProfilePageBackgroundImage() {
        return profilePageBackgroundImage;
    }

    public void setProfilePageBackgroundImage(String profilePageBackgroundImage) {
        this.profilePageBackgroundImage = profilePageBackgroundImage;
    }

    public String getGlobalChatBackgroundImage() {
        return globalChatBackgroundImage;
    }

    public void setGlobalChatBackgroundImage(String globalChatBackgroundImage) {
        this.globalChatBackgroundImage = globalChatBackgroundImage;
    }

    public boolean isPressEnterToSend() {
        return pressEnterToSend;
    }

    public void setPressEnterToSend(boolean pressEnterToSend) {
        this.pressEnterToSend = pressEnterToSend;
    }

    public String getApplicationLanguage() {
        return applicationLanguage;
    }

    public void setApplicationLanguage(String applicationLanguage) {
        this.applicationLanguage = applicationLanguage;
    }

    public boolean isAllowHideScrollControl() {
        return allowHideScrollControl;
    }

    public void setAllowHideScrollControl(boolean allowHideScrollControl) {
        this.allowHideScrollControl = allowHideScrollControl;
    }

    public boolean isAllowHidePageHeader() {
        return allowHidePageHeader;
    }

    public void setAllowHidePageHeader(boolean allowHidePageHeader) {
        this.allowHidePageHeader = allowHidePageHeader;
    }

    public boolean isAllowHideMessageInput() {
        return allowHideMessageInput;
    }

    public void setAllowHideMessageInput(boolean allowHideMessageInput) {
        this.allowHideMessageInput = allowHideMessageInput;
    }

    public boolean isModalFade() {
        return modalFade;
    }

    public void setModalFade(boolean modalFade) {
        this.modalFade = modalFade;
    }

    public boolean isAssistiveLinks() {
        return assistiveLinks;
    }

    public void setAssistiveLinks(boolean assistiveLinks) {
        this.assistiveLinks = assistiveLinks;
    }

    public Preferences(int id, int userid, boolean darkMode, String profilePageBackgroundImage, String globalChatBackgroundImage, boolean pressEnterToSend, String applicationLanguage, boolean allowHideScrollControl, boolean allowHidePageHeader, boolean allowHideMessageInput, boolean modalFade, boolean assistiveLinks) {
        this.id = id;
        this.userid = userid;
        this.darkMode = darkMode;
        this.profilePageBackgroundImage = profilePageBackgroundImage;
        this.globalChatBackgroundImage = globalChatBackgroundImage;
        this.pressEnterToSend = pressEnterToSend;
        this.applicationLanguage = applicationLanguage;
        this.allowHideScrollControl = allowHideScrollControl;
        this.allowHidePageHeader = allowHidePageHeader;
        this.allowHideMessageInput = allowHideMessageInput;
        this.modalFade = modalFade;
        this.assistiveLinks = assistiveLinks;
    }

    @Override
    public String toString() {
        return "Preferences{" +
                "id=" + id +
                ", userid=" + userid +
                ", darkMode=" + darkMode +
                ", profilePageBackgroundImage='" + profilePageBackgroundImage + '\'' +
                ", globalChatBackgroundImage='" + globalChatBackgroundImage + '\'' +
                ", pressEnterToSend=" + pressEnterToSend +
                ", applicationLanguage='" + applicationLanguage + '\'' +
                ", allowHideScrollControl=" + allowHideScrollControl +
                ", allowHidePageHeader=" + allowHidePageHeader +
                ", allowHideMessageInput=" + allowHideMessageInput +
                ", modalFade=" + modalFade +
                ", assistiveLinks=" + assistiveLinks +
                '}';
    }
}
